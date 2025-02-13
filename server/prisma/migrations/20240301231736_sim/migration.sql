/*
  Warnings:

  - Added the required column `dadosAvatares` to the `Salas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `salas` ADD COLUMN `dadosAvatares` VARCHAR(191) NOT NULL;
