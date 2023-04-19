-- CreateTable
CREATE TABLE `Usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `criado_em` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Usuario_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DadosExtras` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `usuario_id` INTEGER NOT NULL,
    `telefone` VARCHAR(191) NULL,
    `cpf` VARCHAR(191) NULL,
    `data_nascimento` DATETIME(3) NULL,
    `genero` ENUM('masculino', 'feminino', 'outros') NOT NULL,
    `escolaridade` VARCHAR(191) NULL,
    `zona_residencial` ENUM('urbana', 'rural') NULL,
    `estado_civil` ENUM('solteiro', 'casado', 'separado', 'divorciado', 'viuvo', 'nao_informar') NOT NULL,
    `orientacao_sexual` ENUM('heterossexual', 'homossexual', 'bissexual', 'outros', 'nao_informar') NOT NULL,
    `problema_mental` BOOLEAN NOT NULL,
    `problema_mental_quais` VARCHAR(191) NULL,
    `uso_medicamento` BOOLEAN NOT NULL,
    `uso_medicamento_quais` VARCHAR(191) NULL,

    UNIQUE INDEX `DadosExtras_usuario_id_key`(`usuario_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `DadosExtras` ADD CONSTRAINT `DadosExtras_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
