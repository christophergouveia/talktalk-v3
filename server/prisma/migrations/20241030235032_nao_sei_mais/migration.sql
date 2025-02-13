/*
  Warnings:

  - The primary key for the `mensagens` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `mensagens` table. All the data in the column will be lost.
  - The primary key for the `salas_usuarios` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `dataEnvio` to the `Mensagens` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuario` to the `Mensagens` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `mensagens` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `dataEnvio` DATETIME(3) NOT NULL,
    ADD COLUMN `usuario` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`codigoSala`);

-- AlterTable
ALTER TABLE `salas_usuarios` DROP PRIMARY KEY,
    MODIFY `userData` VARCHAR(255) NOT NULL,
    ADD PRIMARY KEY (`codigoSala`, `userData`);
