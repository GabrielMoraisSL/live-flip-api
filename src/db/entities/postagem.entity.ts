import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  ManyToMany,
  JoinColumn,
  JoinTable,
} from 'typeorm';
import { Usuario } from './usuario.entity';
import { Conquista } from './conquista.entity';

@Entity('postagens')
export class Postagem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 256 })
  titulo: string;

  @Column({ length: 256 })
  local: string;

  @Column()
  midia: string;

  @CreateDateColumn({ name: 'criado_em', type: 'timestamptz' })
  criadoEm: Date;

  @UpdateDateColumn({ name: 'atualizado_em', type: 'timestamptz' })
  atualizadoEm: Date;

  @DeleteDateColumn({ name: 'excluido_em', type: 'timestamptz', nullable: true })
  excluidoEm: Date;

  @ManyToOne(() => Usuario, (usuario) => usuario.postagens, { nullable: false })
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

  @Column({ name: 'usuario_id', type: 'uuid' })
  usuarioId: string;

  @ManyToOne(() => Conquista, (conquista) => conquista.postagens, {
    nullable: true,
  })
  @JoinColumn({ name: 'conquista_id' })
  conquista: Conquista;

  @Column({ name: 'conquista_id', type: 'uuid', nullable: true })
  conquistaId: string;

  @ManyToMany(() => Usuario, (usuario) => usuario.curtidas)
  @JoinTable({
    name: 'curtidas_postagens',
    joinColumn: { name: 'postagem_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'usuario_id', referencedColumnName: 'id' },
  })
  curtidas: Usuario[];
}
