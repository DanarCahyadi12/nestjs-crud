/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `product` DROP COLUMN `updatedAt`,
    ADD COLUMN `updatedAts` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
