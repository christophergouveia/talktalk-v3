/*
  Warnings:

  - You are about to drop the column `dadosAvatares` on the `salas` table. All the data in the column will be lost.
  - You are about to drop the column `socketIds` on the `salas` table. All the data in the column will be lost.
  - Added the required column `criadorId` to the `Salas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `salas` DROP COLUMN `dadosAvatares`,
    DROP COLUMN `socketIds`,
    ADD COLUMN `criadorId` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Salas_Usuarios` (
    `codigoSala` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `apelido` VARCHAR(191) NOT NULL,
    `cor` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`codigoSala`, `userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Salas_Usuarios` ADD CONSTRAINT `Salas_Usuarios_codigoSala_fkey` FOREIGN KEY (`codigoSala`) REFERENCES `Salas`(`codigoSala`) ON DELETE RESTRICT ON UPDATE CASCADE;
