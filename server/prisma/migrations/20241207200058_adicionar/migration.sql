/*
  Warnings:

  - The primary key for the `salas_usuarios` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `salas_usuarios` DROP PRIMARY KEY,
    MODIFY `userData` VARCHAR(400) NOT NULL,
    ADD PRIMARY KEY (`codigoSala`, `userData`);
