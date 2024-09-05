import { MigrationInterface, QueryRunner } from "typeorm";

export class CityesAndProvinces1725362403643 implements MigrationInterface {
    name = 'CityesAndProvinces1725362403643'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cities" ("id" integer NOT NULL, "name" character varying NOT NULL, "slug" character varying NOT NULL, "province_id" integer, CONSTRAINT "PK_4762ffb6e5d198cfec5606bc11e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "provinces" ("id" integer NOT NULL, "name" character varying NOT NULL, "slug" character varying NOT NULL, "tel_prefix" character varying NOT NULL, CONSTRAINT "PK_2e4260eedbcad036ec53222e0c7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "brands" DROP COLUMN "slug"`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "slug"`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "city"`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD "cityId" integer`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD "proviceId" integer`);
        await queryRunner.query(`ALTER TABLE "cities" ADD CONSTRAINT "FK_72fc137b761ba428ffadff3a715" FOREIGN KEY ("province_id") REFERENCES "provinces"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD CONSTRAINT "FK_221420cb636d4e9e48aeca528a0" FOREIGN KEY ("cityId") REFERENCES "cities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD CONSTRAINT "FK_e4662d9bf2fdb338b7a268ea194" FOREIGN KEY ("proviceId") REFERENCES "provinces"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" DROP CONSTRAINT "FK_e4662d9bf2fdb338b7a268ea194"`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP CONSTRAINT "FK_221420cb636d4e9e48aeca528a0"`);
        await queryRunner.query(`ALTER TABLE "cities" DROP CONSTRAINT "FK_72fc137b761ba428ffadff3a715"`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "provice_id"`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "cityId_id"`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD "city" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "category" ADD "slug" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "brands" ADD "slug" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "provinces"`);
        await queryRunner.query(`DROP TABLE "cities"`);
    }

}
