import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, HttpCode, UseGuards, Req } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { LoginUsuarioDto } from './dto/login-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { JwtService } from '@nestjs/jwt';
import jwtOpcoes from './../config/jwt';
import { AutenticadoGuard } from '../jwt/autenticado.guard';
import { Request } from 'express';
import { AdminGuard } from '../jwt/admin.guard';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService, private jwtService: JwtService) {}

  //==========================================================
  @Post()
  async criar(@Body() dados: CreateUsuarioDto) {
    console.log('USUARIO - CADASTRO')
    dados.admin = false;
    return this.salvarUsuario(dados);
  }

  //==========================================================
  @Post('/admin')
  @UseGuards(AdminGuard)
  async criarAdmin(@Req() request: Request, @Body() dados: CreateUsuarioDto) {
    console.log('Admin' , request['jwt']['admin']);
    dados.admin = request['jwt']['admin'] ? dados.admin : false;
    return this.salvarUsuario(dados);
  }
  //===========================================================
  private async salvarUsuario( dados: CreateUsuarioDto) {
    
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
      jwt: this.jwtService.sign({payload: retorno.usuario}, jwtOpcoes),
      usuario: retorno.usuario
    }
  }

  //==========================================================
  @Get()
  @UseGuards(AdminGuard)
  buscarTodos(@Req() request: Request) {
    console.log(request['jwt']);
    return this.usuariosService.buscarTodos();
  }

  //==========================================================
  @Get(':id')
  @UseGuards(AutenticadoGuard)
  async buscarUsuario(@Req() request: Request, @Param('id') id: string|number) {
    if (!request['jwt']['admin'])
      id = request['jwt']['id'];
    
    const usuario = await this.usuariosService.buscarPorId(+id);
    if (!usuario) throw new HttpException("Usuário não encontrado", 404);
    delete usuario['senha'];
    return usuario;
  }
  //========================================================
  @Patch(':id')
  @UseGuards(AutenticadoGuard)
  atualizar(@Req() request: Request, @Param('id') id: string, @Body() dados: UpdateUsuarioDto) {
    if (!request['jwt']['admin']) {
      id = request['jwt']['id'];
      delete dados.admin;
    }

    return this.usuariosService.atualizar(+id, dados);
  }

  //=======================================================
  @Delete(':id')
  @UseGuards(AutenticadoGuard)
  remove(@Req() request: Request, @Param('id') id: string) {
    //Senão for admin só pode excluir o próprio usuário
    if (!request['jwt']['admin']) {
      id = request['jwt']['id'];
    }

    return this.usuariosService.remove(+id);
  }
}
