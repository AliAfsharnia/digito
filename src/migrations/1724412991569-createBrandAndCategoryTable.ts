import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateBrandAndCategoryTable1724412991569 implements MigrationInterface {
    name = 'CreateBrandAndCategoryTable1724412991569'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "brands" ("brandId" SERIAL NOT NULL, "name" character varying NOT NULL, "count" integer NOT NULL DEFAULT '0', "description" character varying NOT NULL DEFAULT '', "image" character varying NOT NULL DEFAULT '', CONSTRAINT "PK_80bb7c42fb72877053a3b69d020" PRIMARY KEY ("brandId"))`);
        await queryRunner.query(`CREATE TABLE "category" ("brandId" SERIAL NOT NULL, "name" character varying NOT NULL, "count" integer NOT NULL DEFAULT '0', "description" character varying NOT NULL DEFAULT '', "image" character varying NOT NULL DEFAULT '', CONSTRAINT "PK_2f02288c736913717de6855e658" PRIMARY KEY ("brandId"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "brands"`);
    }

}
