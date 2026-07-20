import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Postagem } from '../db/entities/postagem.entity';
import { CriarPostagemDto } from './dtos/criar-postagem.dto';
import { AtualizarPostagemDto } from './dtos/atualizar-postagem.dto';
import { FindAllParametrosDto } from './dtos/find-all-parametros.dto';
import { PostagemDto } from './dtos/postagem.dto';

@Injectable()
export class PostagensService {
  constructor(
    @InjectRepository(Postagem)
    private readonly postagemRepository: Repository<Postagem>,
  ) {}

  async criar(dto: CriarPostagemDto, usuarioId: string): Promise<string> {
    const postagem = this.postagemRepository.create({
      titulo: dto.titulo,
      local: dto.local,
      midia: dto.midia,
      usuarioId,
      conquistaId: dto.conquistaId ?? undefined,
    });
    const saved = await this.postagemRepository.save(postagem);
    return saved.id;
  }

  async listar(params: FindAllParametrosDto): Promise<PostagemDto[]> {
    const where: any = {};

    if (params.titulo) {
      where.titulo = params.titulo;
    }
    if (params.local) {
      where.local = params.local;
    }

    const postagens = await this.postagemRepository.find({
      where,
      relations: ['usuario', 'conquista', 'curtidas'],
    });

    return postagens.map((p) => this.toDto(p));
  }

  async encontrarPorId(id: string): Promise<PostagemDto> {
    const postagem = await this.postagemRepository.findOne({
      where: { id },
      relations: ['usuario', 'conquista', 'curtidas'],
    });

    if (!postagem) {
      throw new NotFoundException('Nenhum item encontrado com esse id');
    }

    return this.toDto(postagem);
  }

  async atualizar(id: string, dto: AtualizarPostagemDto): Promise<void> {
    const postagem = await this.postagemRepository.findOne({
      where: { id },
    });

    if (!postagem) {
      throw new NotFoundException('Nenhum item encontrado com esse id');
    }

    if (dto.titulo !== undefined) postagem.titulo = dto.titulo;
    if (dto.local !== undefined) postagem.local = dto.local;
    if (dto.midia !== undefined) postagem.midia = dto.midia;
    if (dto.conquistaId !== undefined) postagem.conquistaId = dto.conquistaId;

    await this.postagemRepository.save(postagem);
  }

  async remover(id: string): Promise<void> {
    const resultado = await this.postagemRepository.delete(id);

    if (!resultado.affected) {
      throw new NotFoundException('Nenhum item encontrado com esse id');
    }
  }

  async curtir(postagemId: string, usuarioId: string): Promise<void> {
    const postagem = await this.postagemRepository.findOne({
      where: { id: postagemId },
      relations: ['curtidas'],
    });

    if (!postagem) {
      throw new NotFoundException('Postagem não encontrada');
    }

    const jaCurtiu = postagem.curtidas.some((u) => u.id === usuarioId);
    if (!jaCurtiu) {
      await this.postagemRepository
        .createQueryBuilder()
        .relation(Postagem, 'curtidas')
        .of(postagemId)
        .add(usuarioId);
    }
  }

  async descurtir(postagemId: string, usuarioId: string): Promise<void> {
    const postagem = await this.postagemRepository.findOne({
      where: { id: postagemId },
      relations: ['curtidas'],
    });

    if (!postagem) {
      throw new NotFoundException('Postagem não encontrada');
    }

    const jaCurtiu = postagem.curtidas.some((u) => u.id === usuarioId);
    if (jaCurtiu) {
      await this.postagemRepository
        .createQueryBuilder()
        .relation(Postagem, 'curtidas')
        .of(postagemId)
        .remove(usuarioId);
    }
  }

  private toDto(entity: Postagem): PostagemDto {
    return {
      id: entity.id,
      titulo: entity.titulo,
      local: entity.local,
      midia: entity.midia,
      usuarioId: entity.usuarioId,
      usuario: entity.usuario
        ? { id: entity.usuario.id, nome: entity.usuario.nome }
        : undefined,
      conquistaId: entity.conquistaId ?? undefined,
      conquista: entity.conquista
        ? {
            id: entity.conquista.id,
            nome: entity.conquista.nome,
            base: entity.conquista.base,
            pontuacao: entity.conquista.pontuacao,
          }
        : undefined,
      curtidas: entity.curtidas?.map((u) => ({ id: u.id, nome: u.nome })),
      criadoEm: entity.criadoEm.toISOString(),
      atualizadoEm: entity.atualizadoEm.toISOString(),
    };
  }
}
