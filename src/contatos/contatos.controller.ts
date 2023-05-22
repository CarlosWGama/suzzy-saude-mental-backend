import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ContatosService } from './contatos.service';
import { CreateContatoDto } from './dto/create-contato.dto';
import { AutenticadoGuard } from '../jwt/autenticado.guard';
import { AdminGuard } from '../jwt/admin.guard';

@Controller('contatos')
export class ContatosController {
  constructor(private readonly contatosService: ContatosService) {}

  //==========================================================
  @Post()
  @UseGuards(AutenticadoGuard)
  create(@Req() request: Request, @Body() dados: CreateContatoDto) {
    dados.usuario_id = request['jwt']['id'];
    console.log(dados)
    return this.contatosService.cadastrar(dados);
  }

  //==========================================================
  @Get()
  @UseGuards(AutenticadoGuard)
  findAll(@Req() request: Request) {
    const usuarioID = request['jwt']['id'];
    return this.contatosService.buscarContatos(usuarioID);
  }

  //==========================================================
  @Get(':usuarioID')
  @UseGuards(AdminGuard)
  findOne(@Req() request: Request, @Param('usuarioID') usuarioID: string) {
    if (!request['jwt']['admin'])
      usuarioID = request['jwt']['id'];
    return this.contatosService.buscarContatos(+usuarioID);
  }

  //==========================================================
  @Delete(':id')
  @UseGuards(AutenticadoGuard)
  remove(@Param('id') id: string) {
    return this.contatosService.remover(+id);
  }
}
