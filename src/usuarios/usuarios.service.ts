import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PrismaService } from '../prisma.service';
import { Usuario } from '@prisma/client';
import { LoginUsuarioDto } from './dto/login-usuario.dto';
import bcrypt from 'bcryptjs';


@Injectable()
export class UsuariosService {

  constructor(private prisma: PrismaService) {}

  //Cadastra usuário
  async cadastrar(dados: CreateUsuarioDto) {
    
    const salt = 10;
    bcrypt.hash(dados.senha, salt, async function(err, hash) {
        console.log(hash)
      const usuario = await this.prisma.usuario.create({data: {
        nome: dados.nome,
        email: dados.email,
        senha: hash,
        //@ts-ignore
        admin: (dados.admin ? dados.admin : false)
      }})
      
      const data = {...dados, usuario_id: usuario.id}
      //@ts-ignore
      await this.prisma.dadosExtras.create({data})

    })

  }

  async logar(dados: LoginUsuarioDto) {

  }



  findAll() {
    return `This action returns all usuarios`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usuario`;
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
}
