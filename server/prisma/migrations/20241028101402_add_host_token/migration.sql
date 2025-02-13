/*
  Warnings:

  - Added the required column `hostToken` to the `Salas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `salas` ADD COLUMN `hostToken` VARCHAR(191) NOT NULL;
