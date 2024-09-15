import { MigrationInterface, QueryRunner } from "typeorm";

export class CityesAndProvincesFix1726406840371 implements MigrationInterface {
    name = 'CityesAndProvincesFix1726406840371'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" DROP CONSTRAINT "FK_e4662d9bf2fdb338b7a268ea194"`);
        await queryRunner.query(`ALTER TABLE "cities" RENAME COLUMN "province_id" TO "proviceId"`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "proviceId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" ADD "proviceId" integer`);
        await queryRunner.query(`ALTER TABLE "cities" RENAME COLUMN "proviceId" TO "province_id"`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD CONSTRAINT "FK_e4662d9bf2fdb338b7a268ea194" FOREIGN KEY ("proviceId") REFERENCES "provinces"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
