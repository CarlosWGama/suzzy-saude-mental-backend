import { Injectable } from '@nestjs/common';
import { CreateContatoDto } from './dto/create-contato.dto';
import { UpdateContatoDto } from './dto/update-contato.dto';
import { PrismaService } from '../prisma.service';
import { filtrarCampos } from '../helpers/prisma.helper';
import { Contato } from '@prisma/client';

@Injectable()
export class ContatosService {

  constructor(private prisma: PrismaService) {}

  // Cadastrar um novo contato ao usuário
  async cadastrar(data: CreateContatoDto): Promise<{sucesso:boolean, contato?:any, erro?:string}> {
         
    try {
    
      const contato = await this.prisma.contato.create({data})
      console.log(contato)
      return {sucesso: true, contato}
    } catch(e) {
        console.log(e);
        return {sucesso: false, erro: 'Falha ao salvar dados'};
    }
  }

  // Busca os contatos do usuário
  async buscarContatos(usuarioID: number): Promise<{sucesso: boolean, contatos?: Contato[], erro?: string}> {
    try {
      const contatos = await this.prisma.contato.findMany({where: {usuario_id: usuarioID}})
      return { sucesso: true, contatos }
    } catch (e) {
      console.log(e)
      return { sucesso: false, erro: 'Falha no banco - ' + e?.meta?.cause}
    }
    
  }

  //Remover o contato
  async remover(id: number): Promise<{sucesso: boolean, erro?:string}> {
    try {
      await this.prisma.contato.delete({where:{id}})
      return { sucesso: true }
    } catch (e) {
      console.log(e)
      return { sucesso: false, erro: e?.meta?.cause }
    }
  }
}
