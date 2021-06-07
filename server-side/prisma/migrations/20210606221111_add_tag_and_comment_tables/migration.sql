-- AlterTable
ALTER TABLE `post` ADD COLUMN `tagId` INTEGER;

-- CreateTable
CREATE TABLE `Comment` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `CreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `Comment` VARCHAR(191) NOT NULL,
    `WrittenById` INTEGER NOT NULL,
    `PostId` INTEGER NOT NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tag` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `Title` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Tag.Title_unique`(`Title`),
    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Post` ADD FOREIGN KEY (`tagId`) REFERENCES `Tag`(`Id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD FOREIGN KEY (`WrittenById`) REFERENCES `User`(`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD FOREIGN KEY (`PostId`) REFERENCES `Post`(`Id`) ON DELETE CASCADE ON UPDATE CASCADE;
