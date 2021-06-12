/*
  Warnings:

  - Added the required column `categoryId` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `category` ADD COLUMN `ParentId` INTEGER,
    ADD COLUMN `categoryId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Category` ADD FOREIGN KEY (`categoryId`) REFERENCES `Category`(`Id`) ON DELETE CASCADE ON UPDATE CASCADE;
