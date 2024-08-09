/*
  Warnings:

  - Added the required column `updateAt` to the `Salas_Usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `salas_usuarios` ADD COLUMN `updateAt` DATETIME(3) NOT NULL;
