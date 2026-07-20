import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuarioDto } from './dros/usuario.dto';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  create(@Body() usuario: UsuarioDto): string {
    return this.usuariosService.criar(usuario);
  }

  @Get()
  findAll(): UsuarioDto[] {
    return this.usuariosService.listar();
  }
}
