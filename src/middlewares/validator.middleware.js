import { param, validationResult } from "express-validator";
import ApiError from "../utils/ApiError.js";

const validateMiddleware = [
  param("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")

    .isLength({ min: 1, max: 39 })
    .withMessage("GitHub username must be between 1 and 39 characters")

    .matches(/^[a-zA-Z0-9-]+$/)
    .withMessage(
      "GitHub username can only contain letters, numbers, and hyphens",
    ),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return next(new ApiError(400, errors.array()[0].msg));
    }

    next();
  },
];

export default validateMiddleware;
