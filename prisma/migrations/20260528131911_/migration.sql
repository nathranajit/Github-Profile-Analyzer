-- CreateTable
CREATE TABLE `GithubProfile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `githubId` INTEGER NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `bio` TEXT NULL,
    `avatarUrl` VARCHAR(191) NULL,
    `githubUrl` VARCHAR(191) NOT NULL,
    `company` VARCHAR(191) NULL,
    `blog` VARCHAR(191) NULL,
    `location` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `publicRepos` INTEGER NOT NULL DEFAULT 0,
    `publicGists` INTEGER NOT NULL DEFAULT 0,
    `followers` INTEGER NOT NULL DEFAULT 0,
    `following` INTEGER NOT NULL DEFAULT 0,
    `githubCreatedAt` DATETIME(3) NOT NULL,
    `githubUpdatedAt` DATETIME(3) NOT NULL,
    `lastAnalyzedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `GithubProfile_githubId_key`(`githubId`),
    UNIQUE INDEX `GithubProfile_username_key`(`username`),
    INDEX `GithubProfile_username_idx`(`username`),
    INDEX `GithubProfile_githubId_idx`(`githubId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
