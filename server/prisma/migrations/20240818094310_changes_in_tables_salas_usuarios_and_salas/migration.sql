/*
  Warnings:

  - You are about to drop the column `host` on the `salas` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `salas` DROP COLUMN `host`;

-- AlterTable
ALTER TABLE `salas_usuarios` ADD COLUMN `host` BOOLEAN NOT NULL DEFAULT false;
