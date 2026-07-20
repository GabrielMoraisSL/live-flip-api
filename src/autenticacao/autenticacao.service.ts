import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AutenticacaoLogarDto } from './dtos/autenticacao-logar.dto';
import { AutenticacaoResponseDto } from './dtos/autenticacao-response.dto';
import { UsuariosService } from '../usuarios/usuarios.service';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AutenticacaoService {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async logar(acesso: AutenticacaoLogarDto): Promise<AutenticacaoResponseDto> {
    const usuarioEncontrado = await this.usuariosService.encontrarPorNome(
      acesso.nome,
    );

    if (
      !usuarioEncontrado ||
      !compareSync(acesso.senha, usuarioEncontrado.senha)
    ) {
      throw new UnauthorizedException(
        'Usuário não encontrado ou senha inválida',
      );
    }

    const payload = {
      sub: usuarioEncontrado.id,
      nome: usuarioEncontrado.nome,
    };

    const token = this.jwtService.sign(payload);

    return {
      token,
      expiresIn: this.configService.get<string>('JWT_EXPIRATION_TIME') || '1d',
    };
  }
}
