-- AlterTable
ALTER TABLE `mensagens` ADD COLUMN `linguaOriginal` VARCHAR(191) NULL DEFAULT 'pt',
    MODIFY `mensagem` VARCHAR(1000) NOT NULL,
    MODIFY `mensagemTraduzida` VARCHAR(1000) NULL;
