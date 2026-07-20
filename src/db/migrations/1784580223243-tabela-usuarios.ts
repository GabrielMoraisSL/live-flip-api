import { MigrationInterface, QueryRunner } from 'typeorm';

export class TabelaUsuarios1784580223243 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
    await queryRunner.query(`CREATE TABLE usuarios (
        id uuid NOT NULL DEFAULT uuid_generate_v4(),
        nome varchar(256) NOT NULL,
        senha varchar(256) NOT NULL,
        criado_em timestamptz NOT NULL DEFAULT now(),
        atualizado_em timestamptz NOT NULL DEFAULT now(),
        excluido_em timestamptz NULL,
        CONSTRAINT pk_usuarios PRIMARY KEY (id),
    CONSTRAINT un_nome_usuario UNIQUE (nome)
    );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS usuarios;`);
  }
}
