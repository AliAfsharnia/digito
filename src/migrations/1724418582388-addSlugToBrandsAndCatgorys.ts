import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSlugToBrandsAndCatgorys1724418582388 implements MigrationInterface {
    name = 'AddSlugToBrandsAndCatgorys1724418582388'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "brands" ADD "slug" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "category" ADD "slug" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "slug"`);
        await queryRunner.query(`ALTER TABLE "brands" DROP COLUMN "slug"`);
    }

}
