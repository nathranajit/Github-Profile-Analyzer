import githubApi from "../config/axios.js";
import prisma from "../config/prisma.js";
import ApiError from "../utils/ApiError.js";

const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;

const PAGE_SIZE = 10;

export async function getAllProfiles(page = 1) {
  const skip = (page - 1) * PAGE_SIZE;

  const profiles = await prisma.githubProfile.findMany({
    skip,
    take: PAGE_SIZE,
    orderBy: {
      createdAt: "desc",
    },
  });

  const totalProfiles = await prisma.githubProfile.count();

  return {
    profiles,
    pagination: {
      total: totalProfiles,
      page,
      pageSize: PAGE_SIZE,
      totalPages: Math.ceil(totalProfiles / PAGE_SIZE),
    },
  };
}

export async function analyzeGithubProfile(username) {
  const existingProfile = await getSingleProfile(username);

  if (existingProfile) {
    const now = new Date();
    const lastAnalyzed = new Date(existingProfile.lastAnalyzedAt);

    const difference = now - lastAnalyzed;

    if (difference < ONE_DAY_IN_MS) {
      return {
        source: "database-cache",
        profile: existingProfile,
      };
    }
  }

  const profileData = await getGithubUser(username);

  const savedProfile = await prisma.githubProfile.upsert({
    where: {
      username,
    },
    update: profileData,
    create: profileData,
  });

  return {
    source: "github-api",
    profile: savedProfile,
  };
}

export async function getSingleProfile(username) {
  return prisma.githubProfile.findUnique({
    where: {
      username,
    },
  });
}

async function getGithubUser(username) {
  try {
    const response = await githubApi.get(`/users/${username}`);
    const githubUser = response.data;

    return {
      githubId: githubUser.id,
      username: githubUser.login,

      name: githubUser.name,
      bio: githubUser.bio,
      avatarUrl: githubUser.avatar_url,
      githubUrl: githubUser.html_url,

      company: githubUser.company,
      blog: githubUser.blog,
      location: githubUser.location,
      email: githubUser.email,

      publicRepos: githubUser.public_repos,
      publicGists: githubUser.public_gists,
      followers: githubUser.followers,
      following: githubUser.following,

      githubCreatedAt: new Date(githubUser.created_at),
      githubUpdatedAt: new Date(githubUser.updated_at),

      lastAnalyzedAt: new Date(),
    };
  } catch (error) {
    if (error.response?.status === 404) {
      throw new ApiError(404, "GitHub profile not found");
    }

    if (error.response?.status === 403) {
      throw new ApiError(403, "GitHub API rate limit exceeded");
    }

    throw new ApiError(500, "Failed to fetch GitHub profile");
  }
}
