import {
  analyzeGithubProfile,
  getAllProfiles,
  getSingleProfile,
} from "../services/github.service.js";

export async function fetchAllProfiles(req, res, next) {
  try {
    const page = parseInt(req.query.page) || 1;

    const result = await getAllProfiles(page);

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
}

export async function analyzeProfile(req, res, next) {
  try {
    const { username } = req.params;

    const result = await analyzeGithubProfile(username);

    return res.status(200).json({
      success: true,
      source: result.source,
      data: result.profile,
    });
  } catch (error) {
    next(error);
  }
}

export async function fetchSingleProfile(req, res, next) {
  try {
    const { username } = req.params;

    if (!username?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Username is required",
      });
    }

    const profile = await getSingleProfile(username);

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found in database",
      });
    }

    return res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    next(error);
  }
}
