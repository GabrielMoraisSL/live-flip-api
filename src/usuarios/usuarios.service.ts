import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../db/entities/usuario.entity';
import { CriarUsuarioDto } from './dtos/criar-usuario.dto';
import { UsuarioResponseDto } from './dtos/usuario-response.dto';
import { hashSync } from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsuariosService implements OnModuleInit {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    private configService: ConfigService,
  ) {}

  async onModuleInit() {
    const existente = await this.usuarioRepository.findOne({
      where: { nome: 'Morais' },
    });
    if (!existente) {
      const vezesCripto = this.getVezesCripto();
      await this.usuarioRepository.save({
        nome: 'Morais',
        senha: hashSync('123456', vezesCripto),
      });
    }
  }

  getVezesCripto(): number {
    const valor = Number(this.configService.get<string>('VEZES_CRIPTO'));
    return Number.isNaN(valor) ? 10 : valor;
  }

  async criar(novoUsuario: CriarUsuarioDto): Promise<string> {
    const vezesCripto = this.getVezesCripto();
    const usuario = this.usuarioRepository.create({
      nome: novoUsuario.nome,
      senha: hashSync(novoUsuario.senha, vezesCripto),
    });
    const saved = await this.usuarioRepository.save(usuario);
    return saved.id;
  }

  async listar(): Promise<UsuarioResponseDto[]> {
    const usuarios = await this.usuarioRepository.find();
    return usuarios.map((u) => ({ id: u.id, nome: u.nome }));
  }

  async encontrarPorNome(nome: string): Promise<Usuario | null> {
    return this.usuarioRepository.findOne({
      where: { nome },
    });
  }
}
