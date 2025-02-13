-- CreateTable
CREATE TABLE `Salas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `codigoSala` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Salas_codigoSala_key`(`codigoSala`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Mensagens` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idSala` INTEGER NOT NULL,
    `mensagemCriptografada` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Mensagens` ADD CONSTRAINT `Mensagens_idSala_fkey` FOREIGN KEY (`idSala`) REFERENCES `Salas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
