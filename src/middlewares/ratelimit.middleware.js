import rateLimit from "express-rate-limit";

const ratelimitMiddleware = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests. Please try again after 1 minute.",
  },
});

export default ratelimitMiddleware;
