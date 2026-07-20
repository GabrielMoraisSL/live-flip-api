import { MigrationInterface, QueryRunner } from 'typeorm';

export class TabelaConquistasUsuarios1784580223245 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE conquistas_usuarios (
        usuario_id uuid NOT NULL,
        conquista_id uuid NOT NULL,
        CONSTRAINT pk_conquistas_usuarios PRIMARY KEY (usuario_id, conquista_id),
        CONSTRAINT fk_conquistas_usuarios_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
        CONSTRAINT fk_conquistas_usuarios_conquista FOREIGN KEY (conquista_id) REFERENCES conquistas(id)
    );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS conquistas_usuarios;`);
  }
}
