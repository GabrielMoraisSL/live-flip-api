import { Injectable } from '@nestjs/common';
import { UsuarioDto } from './dros/usuario.dto';
import { v4 } from 'uuid';
import { hashSync } from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsuariosService {
  private readonly usuarios: UsuarioDto[] = [];

  constructor(private configService: ConfigService) {
    this.usuarios.push({
      id: v4(),
      nome: 'Morais',
      senha: hashSync('123456', this.getVezesCripto()),
    });
  }

  getVezesCripto(): number {
    const valor = Number(this.configService.get<string>('VEZES_CRIPTO'));
    return Number.isNaN(valor) ? 10 : valor;
  }

  criar(novoUsuario: UsuarioDto): string {
    novoUsuario.id = v4();
    const vezesCripto = this.getVezesCripto();
    novoUsuario.senha = hashSync(novoUsuario.senha, vezesCripto);
    this.usuarios.push(novoUsuario);
    return novoUsuario.id;
  }

  listar(): UsuarioDto[] {
    return this.usuarios;
  }

  encontrarPorNome(nome: string): UsuarioDto | null {
    return this.usuarios.find((usuario) => usuario.nome === nome) || null;
  }
}
