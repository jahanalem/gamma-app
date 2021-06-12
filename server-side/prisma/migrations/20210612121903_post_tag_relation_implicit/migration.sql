/*
  Warnings:

  - You are about to drop the column `tagId` on the `post` table. All the data in the column will be lost.
  - You are about to drop the `_tagtopost` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_tagtopost` DROP FOREIGN KEY `_tagtopost_ibfk_1`;

-- DropForeignKey
ALTER TABLE `_tagtopost` DROP FOREIGN KEY `_tagtopost_ibfk_2`;

-- DropForeignKey
ALTER TABLE `post` DROP FOREIGN KEY `post_ibfk_2`;

-- AlterTable
ALTER TABLE `post` DROP COLUMN `tagId`;

-- DropTable
DROP TABLE `_tagtopost`;

-- CreateTable
CREATE TABLE `_PostToTag` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_PostToTag_AB_unique`(`A`, `B`),
    INDEX `_PostToTag_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_PostToTag` ADD FOREIGN KEY (`A`) REFERENCES `Post`(`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PostToTag` ADD FOREIGN KEY (`B`) REFERENCES `Tag`(`Id`) ON DELETE CASCADE ON UPDATE CASCADE;
