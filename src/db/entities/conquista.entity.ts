import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { Postagem } from './postagem.entity';
import { Usuario } from './usuario.entity';

export enum BaseEnum {
  BASE = 'BASE',
  FAKIE = 'FAKIE',
  NOLLIE = 'NOLLIE',
  SWITCH = 'SWITCH',
}

@Entity('conquistas')
export class Conquista {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 256 })
  nome: string;

  @Column({ type: 'enum', enum: BaseEnum })
  base: BaseEnum;

  @Column({ type: 'int' })
  pontuacao: number;

  @OneToMany(() => Postagem, (postagem) => postagem.conquista)
  postagens: Postagem[];

  @ManyToMany(() => Usuario, (usuario) => usuario.conquistas)
  usuarios: Usuario[];
}
