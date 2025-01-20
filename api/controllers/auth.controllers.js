// auth.controllers.js
import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";
import rateLimit from 'express-rate-limit';
import { validatePassword, sanitizeInput } from '../utils/security.js';
import { logAuthEvent } from '../utils/logging.js';

// Rate limiting for authentication attempts
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per IP
  message: 'Too many authentication attempts, please try again later'
});

export const register = async (req, res) => {
  try {
    const { username, email, password, role } = sanitizeInput(req.body);
    
    // Enhanced password validation
    if (!validatePassword(password)) {
      return res.status(400).json({
        message: "Password must be at least 12 characters and include uppercase, lowercase, numbers, and special characters"
      });
    }

    // Check for existing users
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { username }
        ]
      }
    });

    if (existingUser) {
      return res.status(409).json({ message: "Username or email already exists" });
    }

    // Enhanced password hashing with higher work factor
    const hashedPassword = await bcrypt.hash(password, 14);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        role: role || 'USER',
        failedLoginAttempts: 0,
        lastLoginAttempt: new Date()
      }
    });

    // Log registration event
    await logAuthEvent({
      userId: newUser.id,
      eventType: 'REGISTRATION',
      ipAddress: req.ip,
      userAgent: req.headers['user-agent']
    });

    res.status(201).json({ message: "User Created Successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create user" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password, twoFactorCode } = sanitizeInput(req.body);

    const user = await prisma.user.findUnique({
      where: { username },
      include: {
        securityLog: {
          orderBy: {
            createdAt: 'desc'
          },
          take: 1
        }
      }
    });

    if (!user) {
      await logAuthEvent({
        eventType: 'FAILED_LOGIN',
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
        details: 'Invalid username'
      });
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check account lockout
    if (user.failedLoginAttempts >= 3) {
      const lockoutTime = new Date(user.lastLoginAttempt.getTime() + 30 * 60000); // 30 minutes
      if (new Date() < lockoutTime) {
        return res.status(423).json({ 
          message: "Account temporarily locked. Please try again later or contact support." 
        });
      }
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          failedLoginAttempts: {
            increment: 1
          },
          lastLoginAttempt: new Date()
        }
      });

      await logAuthEvent({
        userId: user.id,
        eventType: 'FAILED_LOGIN',
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
        details: 'Invalid password'
      });

      return res.status(401).json({ message: "Invalid credentials" });
    }

    // // 2FA verification if enabled
    // if (user.twoFactorEnabled) {
    //   if (!twoFactorCode) {
    //     return res.status(403).json({ message: "2FA code required" });
    //   }
    //   // Verify 2FA code here
    //   // Add your 2FA verification logic
    // }

    // Generate JWT with enhanced security
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
        sessionId: Date.now()
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: '4h',
        algorithm: 'HS512'
      }
    );

    // Reset failed login attempts
    await prisma.user.update({
      where: { id: user.id },
      data: {
        failedLoginAttempts: 0,
        lastLoginAttempt: new Date()
      }
    });

    // Log successful login
    await logAuthEvent({
      userId: user.id,
      eventType: 'LOGIN',
      ipAddress: req.ip,
      userAgent: req.headers['user-agent']
    });

    // Set secure cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 4 * 60 * 60 * 1000, // 4 hours
      path: '/'
    });

    const { password: _, ...userInfo } = user;
    res.status(200).json(userInfo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to login" });
  }
};

export const logout = async (req, res) => {
  try {
    // Log logout event
    await logAuthEvent({
      userId: req.userId,
      eventType: 'LOGOUT',
      ipAddress: req.ip,
      userAgent: req.headers['user-agent']
    });

    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/'
    });
    
    res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to logout" });
  }
};