-- CreateTable
CREATE TABLE `Category` (
    `Id` VARCHAR(191) NOT NULL,
    `ParentId` VARCHAR(191),
    `Title` VARCHAR(50) NOT NULL,
    `IsActive` BOOLEAN NOT NULL,
    `CreatedDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ModifiedDate` DATETIME(3),

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tag` (
    `Id` VARCHAR(191) NOT NULL,
    `Title` VARCHAR(191) NOT NULL,
    `CreatedDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ModifiedDate` DATETIME(3),

    UNIQUE INDEX `Tag.Title_unique`(`Title`),
    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Post` (
    `Id` VARCHAR(191) NOT NULL,
    `AuthorId` VARCHAR(191) NOT NULL,
    `CategoryId` VARCHAR(191),
    `Title` VARCHAR(255) NOT NULL,
    `Description` MEDIUMTEXT,
    `Summary` VARCHAR(255),
    `IsPublished` BOOLEAN NOT NULL DEFAULT false,
    `IsActive` BOOLEAN NOT NULL DEFAULT true,
    `IsActiveNewComment` BOOLEAN NOT NULL DEFAULT true,
    `CreatedDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ModifiedDate` DATETIME(3),

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TagPostMapping` (
    `Id` VARCHAR(191) NOT NULL,
    `PostId` VARCHAR(191),
    `TagId` VARCHAR(191),
    `CreatedDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ModifiedDat` DATETIME(3),

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Comment` (
    `Id` VARCHAR(191) NOT NULL,
    `ParentId` VARCHAR(191),
    `PostId` VARCHAR(191) NOT NULL,
    `WrittenById` VARCHAR(191) NOT NULL,
    `Description` VARCHAR(191) NOT NULL,
    `CreatedDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ModifiedDate` DATETIME(3),

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Profile` (
    `Id` VARCHAR(191) NOT NULL,
    `UserId` VARCHAR(191) NOT NULL,
    `Bio` MEDIUMTEXT,
    `CreatedDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ModifiedDate` DATETIME(3),

    UNIQUE INDEX `Profile.UserId_unique`(`UserId`),
    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `Id` VARCHAR(191) NOT NULL,
    `Email` VARCHAR(64) NOT NULL,
    `NormalizedEmail` VARCHAR(64) NOT NULL,
    `UserName` VARCHAR(64) NOT NULL,
    `NormalizedUserName` VARCHAR(64) NOT NULL,
    `EmailConfirmed` BOOLEAN NOT NULL DEFAULT false,
    `PasswordHash` VARCHAR(1024) NOT NULL,
    `PhoneNumber` VARCHAR(32),
    `PhoneNumberConfirmed` BOOLEAN NOT NULL DEFAULT false,
    `LockoutEnd` DATETIME(3),
    `LockoutEnabled` BOOLEAN NOT NULL DEFAULT false,
    `AccessFailedCount` INTEGER,
    `FirstName` VARCHAR(32),
    `LastName` VARCHAR(32),
    `BirthDate` DATETIME(3),
    `IsEmailPublic` BOOLEAN NOT NULL DEFAULT false,
    `Location` VARCHAR(128),
    `IpAddress` VARCHAR(256),
    `LoginProvider` VARCHAR(256),
    `IsActive` BOOLEAN NOT NULL DEFAULT true,
    `CreatedDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ModifiedDate` DATETIME(3),

    UNIQUE INDEX `User.Email_unique`(`Email`),
    UNIQUE INDEX `User.NormalizedEmail_unique`(`NormalizedEmail`),
    UNIQUE INDEX `User.UserName_unique`(`UserName`),
    UNIQUE INDEX `User.NormalizedUserName_unique`(`NormalizedUserName`),
    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Role` (
    `Id` VARCHAR(191) NOT NULL,
    `Name` VARCHAR(64) NOT NULL,
    `NormalizedName` VARCHAR(64),
    `Description` VARCHAR(512),
    `CreatedDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ModifiedDate` DATETIME(3),

    UNIQUE INDEX `Role.Name_unique`(`Name`),
    UNIQUE INDEX `Role.NormalizedName_unique`(`NormalizedName`),
    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserRoleMapping` (
    `Id` VARCHAR(191) NOT NULL,
    `RoleId` VARCHAR(191),
    `UserId` VARCHAR(191),
    `CreatedDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ModifiedDate` DATETIME(3),

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Category` ADD FOREIGN KEY (`ParentId`) REFERENCES `Category`(`Id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post` ADD FOREIGN KEY (`AuthorId`) REFERENCES `User`(`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post` ADD FOREIGN KEY (`CategoryId`) REFERENCES `Category`(`Id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TagPostMapping` ADD FOREIGN KEY (`PostId`) REFERENCES `Post`(`Id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TagPostMapping` ADD FOREIGN KEY (`TagId`) REFERENCES `Tag`(`Id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD FOREIGN KEY (`ParentId`) REFERENCES `Comment`(`Id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD FOREIGN KEY (`PostId`) REFERENCES `Post`(`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD FOREIGN KEY (`WrittenById`) REFERENCES `User`(`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Profile` ADD FOREIGN KEY (`UserId`) REFERENCES `User`(`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserRoleMapping` ADD FOREIGN KEY (`RoleId`) REFERENCES `Role`(`Id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserRoleMapping` ADD FOREIGN KEY (`UserId`) REFERENCES `User`(`Id`) ON DELETE SET NULL ON UPDATE CASCADE;
