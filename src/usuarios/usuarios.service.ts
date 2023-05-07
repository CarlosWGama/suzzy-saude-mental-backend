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
    //formata data
    if (dados.data_nascimento) {
      const [d, m, y] = dados.data_nascimento.split('/');
      dados.data_nascimento = `${y}-${m}-${d}`;
    }

    
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
      console.log(data);
      data['usuario_id'] = usuario.id
      
      // @ts-ignore
      const extra = await this.prisma.dadosExtras.create({data})
      console.log(extra)
      
      delete usuario.senha;
      return {sucesso: true, usuario}


    } catch(e) {
      if (e?.meta?.target == 'Usuario_email_key')
        return {sucesso: false, erro: 'Email já em uso'}
      else {
        console.log(e);
        return {sucesso: false, erro: 'Falha ao salvar dados'}

      }
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

  //Busca um unico usuário
  async buscarPorId(id: number) {
    console.log(id)
    return this.prisma.usuario.findUnique({where: {id}, include: {extra:true}})
  }

  //atualiza os dados do usuário
  async atualizar(id: number, dados: UpdateUsuarioDto) {
    
    try {
      let data: any = {
        nome: dados.nome,
        admin: (dados.admin ? dados.admin : false)

      }
      if (dados.senha) {
        const bcrypt = require('bcrypt');
        const salt = bcrypt.genSaltSync(12);
        const hash = bcrypt.hashSync(dados.senha, salt);
        data['senha'] = hash;
      }
      const usuario = await this.prisma.usuario.update({where:{id}, data});
      
      data = filtrarCampos(dados, ['telefone', 'cpf', 'data_nascimento', 'genero', 'escolaridade', 'zona_residencial', 'estado_civil', 'orientacao_sexual', 'problema_mental', 'problema_mental_quais', 'uso_medicamento', 'uso_medicamento_quais']);
      
      //formata data
      if (data.data_nascimento) {
        const [d, m, y] = dados.data_nascimento.split('/');
        data.data_nascimento = `${y}-${m}-${d}`;
      }

      const extra = await this.prisma.dadosExtras.update({where: {usuario_id: id}, data})
      console.log(extra)
      
      delete usuario.senha;
      return {sucesso: true, usuario}
    } catch(e) {
      console.log(e)
      return {sucesso: false}
    }
  }

  //Remove um usuário
  async remove(id: number) {
    try {
      await this.prisma.usuario.delete({where: {id}})
      return {sucesso: true, usuario_id: id}
    } catch (e) {
      console.log(e)
      return {sucesso: false}
    }
  }
}
