import { MigrationInterface, QueryRunner } from 'typeorm';

export class TabelaConquistas1784580223244 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE base_enum AS ENUM ('BASE', 'FAKIE', 'NOLLIE', 'SWITCH');`,
    );
    await queryRunner.query(`CREATE TABLE conquistas (
        id uuid NOT NULL DEFAULT uuid_generate_v4(),
        nome varchar(256) NOT NULL,
        base base_enum NOT NULL,
        pontuacao int NOT NULL DEFAULT 0,
        CONSTRAINT pk_conquistas PRIMARY KEY (id)
    );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS conquistas;`);
    await queryRunner.query(`DROP TYPE IF EXISTS base_enum;`);
  }
}
