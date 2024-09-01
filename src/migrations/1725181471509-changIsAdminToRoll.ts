import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangIsAdminToRoll1725181471509 implements MigrationInterface {
    name = 'ChangIsAdminToRoll1725181471509'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "isAdmin" TO "roll"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "roll"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "roll" character varying NOT NULL DEFAULT 'customer'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "roll"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "roll" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "roll" TO "isAdmin"`);
    }

}
