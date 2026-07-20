import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CriarUsuarioDto } from './dtos/criar-usuario.dto';
import { UsuarioResponseDto } from './dtos/usuario-response.dto';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  create(@Body() usuario: CriarUsuarioDto): Promise<string> {
    return this.usuariosService.criar(usuario);
  }

  @Get()
  findAll(): Promise<UsuarioResponseDto[]> {
    return this.usuariosService.listar();
  }
}
