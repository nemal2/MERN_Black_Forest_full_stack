// utils/logging.js
import prisma from "../lib/prisma.js";

export const logAuthEvent = async ({
  userId = null,
  eventType,
  ipAddress,
  userAgent,
  details = null
}) => {
  try {
    await prisma.securityLog.create({
      data: {
        userId,
        eventType,
        ipAddress,
        userAgent,
        details
      }
    });
  } catch (error) {
    console.error('Logging error:', error);
    // Continue execution even if logging fails
  }
};