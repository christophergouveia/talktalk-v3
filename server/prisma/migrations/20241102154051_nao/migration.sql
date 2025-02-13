-- AddForeignKey
ALTER TABLE `Mensagens` ADD CONSTRAINT `Mensagens_codigoSala_fkey` FOREIGN KEY (`codigoSala`) REFERENCES `Salas`(`codigoSala`) ON DELETE RESTRICT ON UPDATE CASCADE;
