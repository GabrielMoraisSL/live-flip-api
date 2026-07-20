import { Injectable, NotFoundException } from '@nestjs/common';
import { PostagemDto } from './dtos/postagem.dto';
import { FindAllParametrosDto } from './dtos/find-all-parametros.dto';
import { v4 } from 'uuid';

@Injectable()
export class PostagensService {
  private postagens: PostagemDto[] = [];

  criar(postagem: PostagemDto) {
    postagem.id = v4();
    this.postagens.push(postagem);
    return postagem.id;
  }

  listar(params: FindAllParametrosDto) {
    return this.postagens.filter((p) => {
      let match = true;

      if (params.titulo != undefined && !p.titulo.includes(params.titulo)) {
        match = false;
      }

      if (params.local != undefined && !p.local.includes(params.local)) {
        match = false;
      }

      return match;
    });
  }

  encontrarPorId(id: string) {
    const foundPost = this.postagens.filter((e) => e.id === id);

    if (foundPost.length) {
      return foundPost[0];
    }
    throw new NotFoundException('Nenhum item encontrado com esse id');
  }

  atualizar(postagem: PostagemDto) {
    const postIndex = this.postagens.findIndex((p) => p.id === postagem.id);

    if (postIndex >= 0) {
      this.postagens[postIndex] = postagem;
      return;
    }

    throw new NotFoundException('Nenhum item encontrado com esse id');
  }

  remover(id: string) {
    const postIndex = this.postagens.findIndex((p) => p.id === id);

    if (postIndex >= 0) {
      this.postagens.splice(postIndex, 1);
      return;
    }

    throw new NotFoundException('Nenhum item encontrado com esse id');
  }
}
