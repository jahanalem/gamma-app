/*
  Warnings:

  - You are about to alter the column `Name` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - You are about to drop the `_posttotag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_posttotag` DROP FOREIGN KEY `_posttotag_ibfk_1`;

-- DropForeignKey
ALTER TABLE `_posttotag` DROP FOREIGN KEY `_posttotag_ibfk_2`;

-- AlterTable
ALTER TABLE `post` MODIFY `Description` MEDIUMTEXT;

-- AlterTable
ALTER TABLE `profile` MODIFY `Bio` MEDIUMTEXT;

-- AlterTable
ALTER TABLE `user` MODIFY `Name` VARCHAR(50);

-- DropTable
DROP TABLE `_posttotag`;

-- CreateTable
CREATE TABLE `TagPostMapping` (
    `PostId` INTEGER NOT NULL,
    `TagId` INTEGER NOT NULL,
    `CreatedDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ModifiedDate` DATETIME(3),

    PRIMARY KEY (`PostId`, `TagId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TagPostMapping` ADD FOREIGN KEY (`PostId`) REFERENCES `Post`(`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TagPostMapping` ADD FOREIGN KEY (`TagId`) REFERENCES `Tag`(`Id`) ON DELETE CASCADE ON UPDATE CASCADE;
