import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProductsTableAndRElationsToBrandsAndCatgory1724487632632 implements MigrationInterface {
    name = 'CreateProductsTableAndRElationsToBrandsAndCatgory1724487632632'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" RENAME COLUMN "brandId" TO "categoryId"`);
        await queryRunner.query(`ALTER TABLE "category" RENAME CONSTRAINT "PK_2f02288c736913717de6855e658" TO "PK_8a300c5ce0f70ed7945e877a537"`);
        await queryRunner.query(`ALTER SEQUENCE "category_brandId_seq" RENAME TO "category_categoryId_seq"`);
        await queryRunner.query(`CREATE TABLE "products" ("productId" SERIAL NOT NULL, "slug" character varying NOT NULL, "title" character varying NOT NULL, "stockCount" integer NOT NULL DEFAULT '0', "seller" character varying NOT NULL DEFAULT '', "garanty" character varying NOT NULL DEFAULT '', "description" character varying NOT NULL DEFAULT '', "images" text NOT NULL, "colors" text NOT NULL, "brandBrandId" integer, "categoryCategoryId" integer, CONSTRAINT "PK_7b3b507508cd0f86a5b2e923459" PRIMARY KEY ("productId"))`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_425077bcdf46e8832e30f3fcc0f" FOREIGN KEY ("brandBrandId") REFERENCES "brands"("brandId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_a06a40e89f9347c0f1c7e6834eb" FOREIGN KEY ("categoryCategoryId") REFERENCES "category"("categoryId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_a06a40e89f9347c0f1c7e6834eb"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_425077bcdf46e8832e30f3fcc0f"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`ALTER SEQUENCE "category_categoryId_seq" RENAME TO "category_brandId_seq"`);
        await queryRunner.query(`ALTER TABLE "category" RENAME CONSTRAINT "PK_8a300c5ce0f70ed7945e877a537" TO "PK_2f02288c736913717de6855e658"`);
        await queryRunner.query(`ALTER TABLE "category" RENAME COLUMN "categoryId" TO "brandId"`);
    }

}
