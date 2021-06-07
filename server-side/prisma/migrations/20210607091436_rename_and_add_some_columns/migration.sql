/*
  Warnings:

  - You are about to drop the column `CreatedAt` on the `comment` table. All the data in the column will be lost.
  - You are about to drop the column `CreatedAt` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `UpdatedAt` on the `post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `comment` DROP COLUMN `CreatedAt`,
    ADD COLUMN `CreatedDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `ModifiedDate` DATETIME(3);

-- AlterTable
ALTER TABLE `post` DROP COLUMN `CreatedAt`,
    DROP COLUMN `UpdatedAt`,
    ADD COLUMN `CategoryId` INTEGER,
    ADD COLUMN `CreatedDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `ModifiedDate` DATETIME(3);

-- AlterTable
ALTER TABLE `profile` ADD COLUMN `CreatedDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `ModifiedDate` DATETIME(3);

-- AlterTable
ALTER TABLE `tag` ADD COLUMN `CreatedDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `ModifiedDate` DATETIME(3);

-- AlterTable
ALTER TABLE `user` ADD COLUMN `CreatedDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `ModifiedDate` DATETIME(3);

-- CreateTable
CREATE TABLE `Category` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `CreatedDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ModifiedDate` DATETIME(3),
    `Title` VARCHAR(50) NOT NULL,
    `IsActive` BOOLEAN NOT NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_TagToPost` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_TagToPost_AB_unique`(`A`, `B`),
    INDEX `_TagToPost_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Post` ADD FOREIGN KEY (`CategoryId`) REFERENCES `Category`(`Id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_TagToPost` ADD FOREIGN KEY (`A`) REFERENCES `Post`(`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_TagToPost` ADD FOREIGN KEY (`B`) REFERENCES `Tag`(`Id`) ON DELETE CASCADE ON UPDATE CASCADE;
