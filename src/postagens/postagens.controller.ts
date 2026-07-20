import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PostagemDto } from './dtos/postagem.dto';
import { PostagensService } from './postagens.service';
import { FindAllParametrosDto } from './dtos/find-all-parametros.dto';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('postagens')
export class PostagensController {
  constructor(private readonly postagensService: PostagensService) {}

  @Post()
  create(@Body() postagem: PostagemDto): string {
    return this.postagensService.criar(postagem);
  }

  @Get()
  findAll(@Query() params: FindAllParametrosDto): PostagemDto[] {
    return this.postagensService.listar(params);
  }

  @Get('/:id')
  findById(@Param('id') id: string): PostagemDto {
    return this.postagensService.encontrarPorId(id);
  }

  @Put('/:id')
  update(@Body() postagem: PostagemDto): void {
    this.postagensService.atualizar(postagem);
  }

  @Delete('/:id')
  remove(@Param('id') id: string): void {
    this.postagensService.remover(id);
  }
}
