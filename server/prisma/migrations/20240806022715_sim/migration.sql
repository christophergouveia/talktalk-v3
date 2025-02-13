/*
  Warnings:

  - You are about to drop the column `updateAt` on the `salas_usuarios` table. All the data in the column will be lost.
  - Added the required column `updateAt` to the `Salas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `salas` ADD COLUMN `updateAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `salas_usuarios` DROP COLUMN `updateAt`;
