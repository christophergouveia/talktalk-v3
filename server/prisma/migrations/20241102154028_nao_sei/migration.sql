/*
  Warnings:

  - The primary key for the `mensagens` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `id` to the `Mensagens` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `mensagens` DROP FOREIGN KEY `Mensagens_codigoSala_fkey`;

-- AlterTable
ALTER TABLE `mensagens` DROP PRIMARY KEY,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `mensagemTraduzida` VARCHAR(191) NULL,
    ADD PRIMARY KEY (`id`);
