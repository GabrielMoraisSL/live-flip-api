import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Postagem } from '../db/entities/postagem.entity';
import { PostagensController } from './postagens.controller';
import { PostagensService } from './postagens.service';

@Module({
  imports: [TypeOrmModule.forFeature([Postagem])],
  controllers: [PostagensController],
  providers: [PostagensService],
})
export class PostagensModule {}
