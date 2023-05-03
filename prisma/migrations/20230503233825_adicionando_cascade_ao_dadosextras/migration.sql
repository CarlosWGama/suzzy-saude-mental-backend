-- DropForeignKey
ALTER TABLE `DadosExtras` DROP FOREIGN KEY `DadosExtras_usuario_id_fkey`;

-- AddForeignKey
ALTER TABLE `DadosExtras` ADD CONSTRAINT `DadosExtras_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `Usuario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
