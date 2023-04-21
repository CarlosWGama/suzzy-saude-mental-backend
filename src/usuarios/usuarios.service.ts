import { Injectable, Req } from '@nestjs/common';

import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PrismaService } from '../prisma.service';
import { Usuario } from '@prisma/client';
import { LoginUsuarioDto } from './dto/login-usuario.dto';
import { filtrarCampos } from '../helpers/prisma.helper';


@Injectable()
export class UsuariosService {
  
  constructor(private prisma: PrismaService) {}
  
  //Cadastra usuário
  async cadastrar(dados: CreateUsuarioDto): Promise<{sucesso:boolean, usuario?:any, erro?:string}> {
    
    try {
      const bcrypt = require('bcrypt');
      const salt = bcrypt.genSaltSync(12);
      const hash = bcrypt.hashSync(dados.senha, salt);
      
      const usuario = await this.prisma.usuario.create({data: {
        nome: dados.nome,
        email: dados.email,
        senha: hash,
        //@ts-ignore
        admin: (dados.admin ? dados.admin : false)
      }})
  
      console.log(usuario)
      
      let data = filtrarCampos(dados, ['telefone', 'cpf', 'data_nascimento', 'genero', 'escolaridade', 'zona_residencial', 'estado_civil', 'orientacao_sexual', 'problema_mental', 'problema_mental_quais', 'uso_medicamento', 'uso_medicamento_quais']);
      data['usuario_id'] = usuario.id
      
      // @ts-ignore
      const extra = await this.prisma.dadosExtras.create({data})
      console.log(extra)
      
      delete usuario.senha;
      return {sucesso: true, usuario}


    } catch(e) {
      if (e?.meta?.target == 'Usuario_email_key')
        return {sucesso: false, erro: 'Email já em uso'}
      else
        return {sucesso: false, erro: 'Falha ao salvar dados'}
    }
  }

  //Realiza login
  async logar(dados: LoginUsuarioDto): Promise<{sucesso: boolean, usuario?:any}> {

    //Busca o usuário
    const usuario = await this.prisma.usuario.findFirst({where:{email:dados.email}});
    if (!usuario)
      return {sucesso: false}

    //Valida a senha
    const bcrypt = require('bcrypt');
    if (bcrypt.compareSync(dados.senha, usuario.senha)) {
      delete usuario.senha;
      return {sucesso: true, usuario}
    }
    
    return {sucesso: false}
  }

  //Busca todos os usuários cadastrados
  buscarTodos() {
    return this.prisma.usuario.findMany({include: {extra: true}});
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
