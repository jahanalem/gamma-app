/*
  Warnings:

  - You are about to drop the column `Name` on the `user` table. All the data in the column will be lost.
  - You are about to alter the column `Email` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(64)`.
  - A unique constraint covering the columns `[NormalizedEmail]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[UserName]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[NormalizedUserName]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `AccessFailedCount` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `LockoutEnd` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `NormalizedEmail` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `NormalizedUserName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `PasswordHash` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `UserName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `Name`,
    ADD COLUMN `AccessFailedCount` INTEGER NOT NULL,
    ADD COLUMN `BirthDate` DATETIME(3),
    ADD COLUMN `EmailConfirmed` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `FirstName` VARCHAR(32),
    ADD COLUMN `IpAddress` VARCHAR(256),
    ADD COLUMN `IsActive` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `IsEmailPublic` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `LastName` VARCHAR(32),
    ADD COLUMN `Location` VARCHAR(128),
    ADD COLUMN `LockoutEnabled` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `LockoutEnd` DATETIME(3) NOT NULL,
    ADD COLUMN `LoginProvider` VARCHAR(256),
    ADD COLUMN `NormalizedEmail` VARCHAR(64) NOT NULL,
    ADD COLUMN `NormalizedUserName` VARCHAR(64) NOT NULL,
    ADD COLUMN `PasswordHash` VARCHAR(1024) NOT NULL,
    ADD COLUMN `PhoneNumber` VARCHAR(32),
    ADD COLUMN `PhoneNumberConfirmed` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `UserName` VARCHAR(64) NOT NULL,
    MODIFY `Email` VARCHAR(64) NOT NULL;

-- CreateTable
CREATE TABLE `Role` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(64) NOT NULL,
    `NormalizedName` VARCHAR(64) NOT NULL,
    `Description` VARCHAR(512),
    `CreatedDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ModifiedDate` DATETIME(3),

    UNIQUE INDEX `Role.Name_unique`(`Name`),
    UNIQUE INDEX `Role.NormalizedName_unique`(`NormalizedName`),
    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserRoleMapping` (
    `RoleId` INTEGER NOT NULL,
    `UserId` INTEGER NOT NULL,
    `CreatedDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ModifiedDate` DATETIME(3),

    PRIMARY KEY (`RoleId`, `UserId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `User.NormalizedEmail_unique` ON `User`(`NormalizedEmail`);

-- CreateIndex
CREATE UNIQUE INDEX `User.UserName_unique` ON `User`(`UserName`);

-- CreateIndex
CREATE UNIQUE INDEX `User.NormalizedUserName_unique` ON `User`(`NormalizedUserName`);

-- AddForeignKey
ALTER TABLE `UserRoleMapping` ADD FOREIGN KEY (`RoleId`) REFERENCES `Role`(`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserRoleMapping` ADD FOREIGN KEY (`UserId`) REFERENCES `User`(`Id`) ON DELETE CASCADE ON UPDATE CASCADE;
