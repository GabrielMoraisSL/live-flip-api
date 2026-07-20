import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Postagem } from './postagem.entity';
import { Conquista } from './conquista.entity';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 256, unique: true })
  nome: string;

  @Column({ length: 256 })
  senha: string;

  @CreateDateColumn({ name: 'criado_em', type: 'timestamptz' })
  criadoEm: Date;

  @UpdateDateColumn({ name: 'atualizado_em', type: 'timestamptz' })
  atualizadoEm: Date;

  @DeleteDateColumn({ name: 'excluido_em', type: 'timestamptz', nullable: true })
  excluidoEm: Date;

  @OneToMany(() => Postagem, (postagem) => postagem.usuario)
  postagens: Postagem[];

  @ManyToMany(() => Conquista)
  @JoinTable({
    name: 'conquistas_usuarios',
    joinColumn: { name: 'usuario_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'conquista_id', referencedColumnName: 'id' },
  })
  conquistas: Conquista[];

  @ManyToMany(() => Postagem)
  @JoinTable({
    name: 'curtidas_postagens',
    joinColumn: { name: 'usuario_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'postagem_id', referencedColumnName: 'id' },
  })
  curtidas: Postagem[];
}
