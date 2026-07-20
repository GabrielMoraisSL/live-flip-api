import { Module } from '@nestjs/common';
import { AutenticacaoService } from './autenticacao.service';
import { AutenticacaoController } from './autenticacao.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StringValue } from 'ms';
import { UsuariosModule } from '../usuarios/usuarios.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn:
            (configService.get<string>('JWT_EXPIRATION_TIME') as StringValue) ||
            '1d',
        },
      }),
      inject: [ConfigService],
    }),
    UsuariosModule,
  ],
  providers: [AutenticacaoService],
  controllers: [AutenticacaoController],
})
export class AutenticacaoModule {}
