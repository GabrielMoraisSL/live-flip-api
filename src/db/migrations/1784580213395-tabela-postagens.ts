import { MigrationInterface, QueryRunner } from 'typeorm';

export class TabelaPostagens1784580213395 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
    await queryRunner.query(`CREATE TABLE postagens (
        id uuid NOT NULL DEFAULT uuid_generate_v4(),
        titulo varchar(256) NOT NULL,
        local varchar(256) NOT NULL,
        midia text NOT NULL,
        criado_em timestamptz NOT NULL DEFAULT now(),
        atualizado_em timestamptz NOT NULL DEFAULT now(),
        excluido_em timestamptz NULL,
        CONSTRAINT pk_postagens PRIMARY KEY (id)
    );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS postagens;`);
  }
}
