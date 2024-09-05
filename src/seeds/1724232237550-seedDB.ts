import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsers1724232237550 implements MigrationInterface {
    name = 'CreateUsers1724232237550'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO "users" ( username, email, password, "roll") VALUES ('user1', 'user1@gmail.com', '$2b$10$W0AM95GWmCLTBNkIqK61YOIWzP0Ax3UD.BYBNJuQmp5Rsieul5rb.', 'admin')`);
        await queryRunner.query(`INSERT INTO "brands" ( name) VALUES ('brand1'), ('brand2')`);
        await queryRunner.query(`INSERT INTO "category" ( name) VALUES ('category1'), ('category2')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
