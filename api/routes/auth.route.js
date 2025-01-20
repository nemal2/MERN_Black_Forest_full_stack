import express from "express";
import rateLimit from 'express-rate-limit';
import { login, logout, register } from "../controllers/auth.controllers.js";

const router = express.Router();

// Create rate limiter
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // 5 attempts per IP
    message: 'Too many authentication attempts, please try again later'
  });

router.post("/login", authLimiter, login);
router.post("/register", authLimiter, register);

router.post("/logout", logout);

export default router;
