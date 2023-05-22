import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ContatosModule } from './contatos/contatos.module';

@Module({
  imports: [UsuariosModule, ContatosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
