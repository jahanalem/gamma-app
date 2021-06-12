/*
  Warnings:

  - You are about to drop the column `categoryId` on the `category` table. All the data in the column will be lost.
  - Made the column `ParentId` on table `category` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `category` DROP FOREIGN KEY `category_ibfk_1`;

-- AlterTable
ALTER TABLE `category` DROP COLUMN `categoryId`,
    MODIFY `ParentId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Category` ADD FOREIGN KEY (`ParentId`) REFERENCES `Category`(`Id`) ON DELETE CASCADE ON UPDATE CASCADE;
