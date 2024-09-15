import { MigrationInterface, QueryRunner } from "typeorm";

export class AddressesFix1726413705406 implements MigrationInterface {
    name = 'AddressesFix1726413705406'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" ADD "proviceId" integer`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD CONSTRAINT "FK_e4662d9bf2fdb338b7a268ea194" FOREIGN KEY ("proviceId") REFERENCES "provinces"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" DROP CONSTRAINT "FK_e4662d9bf2fdb338b7a268ea194"`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "proviceId"`);
    }

}
