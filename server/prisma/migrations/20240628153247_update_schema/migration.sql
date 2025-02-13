/*
  Warnings:

  - You are about to drop the column `mensagemCriptografada` on the `mensagens` table. All the data in the column will be lost.
  - You are about to drop the column `criadorId` on the `salas` table. All the data in the column will be lost.
  - The primary key for the `salas_usuarios` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `apelido` on the `salas_usuarios` table. All the data in the column will be lost.
  - You are about to drop the column `cor` on the `salas_usuarios` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `salas_usuarios` table. All the data in the column will be lost.
  - Added the required column `mensagem` to the `Mensagens` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userData` to the `Salas_Usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `mensagens` DROP COLUMN `mensagemCriptografada`,
    ADD COLUMN `mensagem` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `salas` DROP COLUMN `criadorId`,
    ADD COLUMN `host` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `salas_usuarios` DROP PRIMARY KEY,
    DROP COLUMN `apelido`,
    DROP COLUMN `cor`,
    DROP COLUMN `userId`,
    ADD COLUMN `userData` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`codigoSala`, `userData`);
