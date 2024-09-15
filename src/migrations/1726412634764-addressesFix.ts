import { MigrationInterface, QueryRunner } from "typeorm";

export class AddressesFix1726412634764 implements MigrationInterface {
    name = 'AddressesFix1726412634764'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "country"`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "state"`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD "description" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD "state" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD "country" character varying NOT NULL`);
    }

}
