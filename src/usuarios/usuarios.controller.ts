import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, HttpCode, UseGuards, Req } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { LoginUsuarioDto } from './dto/login-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { JwtService } from '@nestjs/jwt';
import jwtOpcoes from './../config/jwt';
import { AutenticadoGuard } from '../jwt/autenticado.guard';
import { Request } from 'express';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService, private jwtService: JwtService) {}

  //==========================================================
  @Post()
  async create(@Body() dados: CreateUsuarioDto) {
    const retorno = await this.usuariosService.cadastrar(dados);
    if (retorno.sucesso)  
      return retorno.usuario
    else
      throw new HttpException(retorno.erro, 500);
  }

  //==========================================================
  @Post('/login')
  @HttpCode(200)
  async login(@Body() dados: LoginUsuarioDto) {
    const retorno = await this.usuariosService.logar(dados);

    //Não encontrado
    if (!retorno.sucesso)
      throw new HttpException('Login ou senha incorreta!', 401)

    //
    return {
      jwt: this.jwtService.sign({payload: retorno.usuario}, jwtOpcoes)
    }
  }

  //==========================================================
  @Get()
  @UseGuards(AutenticadoGuard)
  buscarTodos(@Req() request: Request) {
    console.log(request['jwt-payload']);
    return this.usuariosService.buscarTodos();
  }

  //==========================================================
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuariosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosService.update(+id, updateUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuariosService.remove(+id);
  }
}
