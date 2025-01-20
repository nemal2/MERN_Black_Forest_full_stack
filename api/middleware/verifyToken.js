import jwt from "jsonwebtoken";
import { logAuthEvent } from '../utils/logging.js';

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY, {
      algorithms: ['HS512']
    });

    // Check token expiration
    if (Date.now() >= decoded.exp * 1000) {
      await logAuthEvent({
        userId: decoded.id,
        eventType: 'TOKEN_EXPIRED',
        ipAddress: req.ip,
        userAgent: req.headers['user-agent']
      });
      return res.status(401).json({ message: "Token expired" });
    }

    req.userId = decoded.id;
    req.userRole = decoded.role;
    req.sessionId = decoded.sessionId;

    next();
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      await logAuthEvent({
        eventType: 'INVALID_TOKEN',
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
        details: err.message
      });
      return res.status(403).json({ message: "Invalid token" });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};