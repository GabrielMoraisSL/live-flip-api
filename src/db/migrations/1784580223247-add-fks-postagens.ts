import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddFksPostagens1784580223247 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE postagens ADD COLUMN usuario_id uuid NOT NULL;`,
    );
    await queryRunner.query(
      `ALTER TABLE postagens ADD COLUMN conquista_id uuid;`,
    );
    await queryRunner.query(
      `ALTER TABLE postagens ADD CONSTRAINT fk_postagens_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id);`,
    );
    await queryRunner.query(
      `ALTER TABLE postagens ADD CONSTRAINT fk_postagens_conquista FOREIGN KEY (conquista_id) REFERENCES conquistas(id);`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE postagens DROP CONSTRAINT IF EXISTS fk_postagens_conquista;`,
    );
    await queryRunner.query(
      `ALTER TABLE postagens DROP CONSTRAINT IF EXISTS fk_postagens_usuario;`,
    );
    await queryRunner.query(
      `ALTER TABLE postagens DROP COLUMN IF EXISTS conquista_id;`,
    );
    await queryRunner.query(
      `ALTER TABLE postagens DROP COLUMN IF EXISTS usuario_id;`,
    );
  }
}
