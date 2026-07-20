import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PostagensModule } from './postagens/postagens.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AutenticacaoModule } from './autenticacao/autenticacao.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PostagensModule,
    UsuariosModule,
    AutenticacaoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
