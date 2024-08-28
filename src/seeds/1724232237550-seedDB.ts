import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsers1724232237550 implements MigrationInterface {
    name = 'CreateUsers1724232237550'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO "users" ( username, email, password, "isAdmin") VALUES ('user1', 'user1@gmail.com', '$2b$10$W0AM95GWmCLTBNkIqK61YOIWzP0Ax3UD.BYBNJuQmp5Rsieul5rb.', 1)`);
        await queryRunner.query(`INSERT INTO "brands" ( name, slug) VALUES ('brand1', 'brand1-dmyc1'), ('brand2', 'brand2-s30j6b')`);
        await queryRunner.query(`INSERT INTO "category" ( name, slug) VALUES ('category1', 'category1-ihxsjp'), ('category2', 'category2-d3h9m4')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
