/*
  Warnings:

  - The primary key for the `salas_usuarios` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `mensagens` ADD COLUMN `apelido` VARCHAR(191) NULL,
    ADD COLUMN `avatar` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `salas_usuarios` DROP PRIMARY KEY,
    MODIFY `userData` VARCHAR(300) NOT NULL,
    ADD PRIMARY KEY (`codigoSala`, `userData`);
