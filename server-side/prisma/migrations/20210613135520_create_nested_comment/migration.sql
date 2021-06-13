/*
  Warnings:

  - You are about to drop the column `Comment` on the `comment` table. All the data in the column will be lost.
  - Added the required column `Description` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `comment` DROP COLUMN `Comment`,
    ADD COLUMN `Description` VARCHAR(191) NOT NULL,
    ADD COLUMN `ParentId` INTEGER;

-- AddForeignKey
ALTER TABLE `Comment` ADD FOREIGN KEY (`ParentId`) REFERENCES `Comment`(`Id`) ON DELETE SET NULL ON UPDATE CASCADE;
