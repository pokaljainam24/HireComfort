import rateLimit from "express-rate-limit";

export const visitorRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // maximum 5 requests per minute
  standardHeaders: true,
  legacyHeaders: false,

  message: {
    success: false,
    message: "Too many visitor tracking requests. Please try again later.",
  },
});