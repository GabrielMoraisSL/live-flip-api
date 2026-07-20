import { MigrationInterface, QueryRunner } from 'typeorm';

export class TabelaCurtidasPostagens1784580223246 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE curtidas_postagens (
        usuario_id uuid NOT NULL,
        postagem_id uuid NOT NULL,
        CONSTRAINT pk_curtidas_postagens PRIMARY KEY (usuario_id, postagem_id),
        CONSTRAINT fk_curtidas_postagens_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
        CONSTRAINT fk_curtidas_postagens_postagem FOREIGN KEY (postagem_id) REFERENCES postagens(id)
    );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS curtidas_postagens;`);
  }
}
