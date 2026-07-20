import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { PostagensService } from './postagens.service';
import { FindAllParametrosDto } from './dtos/find-all-parametros.dto';
import { AuthGuard } from '../auth/auth.guard';
import { CriarPostagemDto } from './dtos/criar-postagem.dto';
import { AtualizarPostagemDto } from './dtos/atualizar-postagem.dto';
import { PostagemDto } from './dtos/postagem.dto';
import { JwtPayloadDto } from '../auth/dtos/jwt-payload.dto';

@UseGuards(AuthGuard)
@Controller('postagens')
export class PostagensController {
  constructor(private readonly postagensService: PostagensService) {}

  @Post()
  create(
    @Req() req: Request,
    @Body() dto: CriarPostagemDto,
  ): Promise<string> {
    const usuarioId = (req['user'] as JwtPayloadDto).sub!;
    return this.postagensService.criar(dto, usuarioId);
  }

  @Get()
  findAll(@Query() params: FindAllParametrosDto): Promise<PostagemDto[]> {
    return this.postagensService.listar(params);
  }

  @Get('/:id')
  findById(@Param('id') id: string): Promise<PostagemDto> {
    return this.postagensService.encontrarPorId(id);
  }

  @Put('/:id')
  update(
    @Param('id') id: string,
    @Body() dto: AtualizarPostagemDto,
  ): Promise<void> {
    return this.postagensService.atualizar(id, dto);
  }

  @Delete('/:id')
  remove(@Param('id') id: string): Promise<void> {
    return this.postagensService.remover(id);
  }
}
