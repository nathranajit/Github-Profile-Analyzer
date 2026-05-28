import express from "express";

import {
  analyzeProfile,
  fetchAllProfiles,
  fetchSingleProfile,
} from "../controllers/github.controller.js";
import ratelimitMiddleware from "../middlewares/ratelimit.middleware.js";
import validateMiddleware from "../middlewares/validator.middleware.js";

const router = express.Router();

/**
 * @swagger
 * /github:
 *   get:
 *     summary: Get all analyzed GitHub profiles
 *     description: Returns paginated GitHub profile analyses.
 *
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *
 *     responses:
 *       200:
 *         description: Profiles fetched successfully
 *
 *       500:
 *         description: Internal server error
 */
router.get("/", fetchAllProfiles);

/**
 * @swagger
 * /github/analyze/{username}:
 *   get:
 *     summary: Analyze a GitHub profile
 *     description: Fetches GitHub profile data, stores it in database, and returns analysis result.
 *
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         description: GitHub username
 *
 *     responses:
 *       200:
 *         description: Profile analyzed successfully
 *
 *       404:
 *         description: GitHub profile not found
 *
 *       500:
 *         description: Internal server error
 */
router.get(
  "/analyze/:username",
  ratelimitMiddleware,
  validateMiddleware,
  analyzeProfile,
);

/**
 * @swagger
 * /github/{username}:
 *   get:
 *     summary: Get a stored GitHub profile
 *     description: Fetch a previously analyzed profile from database.
 *
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         description: GitHub username
 *
 *     responses:
 *       200:
 *         description: Profile fetched successfully
 *
 *       404:
 *         description: Profile not found
 *
 *       500:
 *         description: Internal server error
 */
router.get("/:username", validateMiddleware, fetchSingleProfile);

export default router;
