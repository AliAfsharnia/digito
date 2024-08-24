import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPriceColumnToProducts1724489002953 implements MigrationInterface {
    name = 'AddPriceColumnToProducts1724489002953'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "price" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "price"`);
    }

}
