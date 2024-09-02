import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveSeller1725262974861 implements MigrationInterface {
    name = 'RemoveSeller1725262974861'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "seller"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "seller" character varying NOT NULL DEFAULT ''`);
    }

}
