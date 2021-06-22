/*
  Warnings:

  - The primary key for the `category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `comment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `post` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `profile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `role` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `tag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `tagpostmapping` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `userrolemapping` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `category` DROP FOREIGN KEY `category_ibfk_1`;

-- DropForeignKey
ALTER TABLE `comment` DROP FOREIGN KEY `comment_ibfk_3`;

-- DropForeignKey
ALTER TABLE `comment` DROP FOREIGN KEY `comment_ibfk_2`;

-- DropForeignKey
ALTER TABLE `comment` DROP FOREIGN KEY `comment_ibfk_1`;

-- DropForeignKey
ALTER TABLE `post` DROP FOREIGN KEY `post_ibfk_1`;

-- DropForeignKey
ALTER TABLE `post` DROP FOREIGN KEY `post_ibfk_3`;

-- DropForeignKey
ALTER TABLE `profile` DROP FOREIGN KEY `profile_ibfk_1`;

-- DropForeignKey
ALTER TABLE `tagpostmapping` DROP FOREIGN KEY `tagpostmapping_ibfk_1`;

-- DropForeignKey
ALTER TABLE `tagpostmapping` DROP FOREIGN KEY `tagpostmapping_ibfk_2`;

-- DropForeignKey
ALTER TABLE `userrolemapping` DROP FOREIGN KEY `userrolemapping_ibfk_1`;

-- DropForeignKey
ALTER TABLE `userrolemapping` DROP FOREIGN KEY `userrolemapping_ibfk_2`;

-- AlterTable
ALTER TABLE `category` DROP PRIMARY KEY,
    MODIFY `Id` VARCHAR(191) NOT NULL,
    MODIFY `ParentId` VARCHAR(191),
    ADD PRIMARY KEY (`Id`);

-- AlterTable
ALTER TABLE `comment` DROP PRIMARY KEY,
    MODIFY `Id` VARCHAR(191) NOT NULL,
    MODIFY `WrittenById` VARCHAR(191) NOT NULL,
    MODIFY `PostId` VARCHAR(191) NOT NULL,
    MODIFY `ParentId` VARCHAR(191),
    ADD PRIMARY KEY (`Id`);

-- AlterTable
ALTER TABLE `post` DROP PRIMARY KEY,
    MODIFY `Id` VARCHAR(191) NOT NULL,
    MODIFY `AuthorId` VARCHAR(191) NOT NULL,
    MODIFY `CategoryId` VARCHAR(191),
    ADD PRIMARY KEY (`Id`);

-- AlterTable
ALTER TABLE `profile` DROP PRIMARY KEY,
    MODIFY `Id` VARCHAR(191) NOT NULL,
    MODIFY `UserId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`Id`);

-- AlterTable
ALTER TABLE `role` DROP PRIMARY KEY,
    MODIFY `Id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`Id`);

-- AlterTable
ALTER TABLE `tag` DROP PRIMARY KEY,
    MODIFY `Id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`Id`);

-- AlterTable
ALTER TABLE `tagpostmapping` DROP PRIMARY KEY,
    MODIFY `PostId` VARCHAR(191) NOT NULL,
    MODIFY `TagId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`PostId`, `TagId`);

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    MODIFY `Id` VARCHAR(191) NOT NULL,
    MODIFY `EmailConfirmed` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `PhoneNumberConfirmed` BOOLEAN NOT NULL DEFAULT false,
    ADD PRIMARY KEY (`Id`);

-- AlterTable
ALTER TABLE `userrolemapping` DROP PRIMARY KEY,
    MODIFY `RoleId` VARCHAR(191) NOT NULL,
    MODIFY `UserId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`RoleId`, `UserId`);

-- AddForeignKey
ALTER TABLE `Category` ADD FOREIGN KEY (`ParentId`) REFERENCES `Category`(`Id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post` ADD FOREIGN KEY (`AuthorId`) REFERENCES `User`(`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post` ADD FOREIGN KEY (`CategoryId`) REFERENCES `Category`(`Id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TagPostMapping` ADD FOREIGN KEY (`PostId`) REFERENCES `Post`(`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TagPostMapping` ADD FOREIGN KEY (`TagId`) REFERENCES `Tag`(`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD FOREIGN KEY (`ParentId`) REFERENCES `Comment`(`Id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD FOREIGN KEY (`PostId`) REFERENCES `Post`(`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD FOREIGN KEY (`WrittenById`) REFERENCES `User`(`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Profile` ADD FOREIGN KEY (`UserId`) REFERENCES `User`(`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserRoleMapping` ADD FOREIGN KEY (`RoleId`) REFERENCES `Role`(`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserRoleMapping` ADD FOREIGN KEY (`UserId`) REFERENCES `User`(`Id`) ON DELETE CASCADE ON UPDATE CASCADE;
