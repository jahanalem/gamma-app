-- AlterTable
ALTER TABLE `user` MODIFY `AccessFailedCount` INTEGER,
    MODIFY `LockoutEnd` DATETIME(3);
