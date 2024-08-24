import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveCountFromCategoryAndBrand1724492800802 implements MigrationInterface {
    name = 'RemoveCountFromCategoryAndBrand1724492800802'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "brands" DROP COLUMN "count"`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "count"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" ADD "count" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "brands" ADD "count" integer NOT NULL DEFAULT '0'`);
    }

}
