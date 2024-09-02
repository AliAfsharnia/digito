import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveSlugsOfAllTables1725262260577 implements MigrationInterface {
    name = 'RemoveSlugsOfAllTables1725262260577'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "slug"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "slug" character varying NOT NULL`);
    }

}
