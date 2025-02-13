/*
  Warnings:

  - You are about to drop the column `idSala` on the `mensagens` table. All the data in the column will be lost.
  - The primary key for the `salas` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `salas` table. All the data in the column will be lost.
  - Added the required column `codigoSala` to the `Mensagens` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `mensagens` DROP FOREIGN KEY `Mensagens_idSala_fkey`;

-- AlterTable
ALTER TABLE `mensagens` DROP COLUMN `idSala`,
    ADD COLUMN `codigoSala` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `salas` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`codigoSala`);

-- AddForeignKey
ALTER TABLE `Mensagens` ADD CONSTRAINT `Mensagens_codigoSala_fkey` FOREIGN KEY (`codigoSala`) REFERENCES `Salas`(`codigoSala`) ON DELETE RESTRICT ON UPDATE CASCADE;
