import { MigrationInterface, QueryRunner } from "typeorm";

export class SpellFix1726609546717 implements MigrationInterface {
    name = 'SpellFix1726609546717'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cities" DROP CONSTRAINT "FK_72fc137b761ba428ffadff3a715"`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP CONSTRAINT "FK_e4662d9bf2fdb338b7a268ea194"`);
        await queryRunner.query(`ALTER TABLE "cities" RENAME COLUMN "proviceId" TO "provinceId"`);
        await queryRunner.query(`ALTER TABLE "addresses" RENAME COLUMN "proviceId" TO "provinceId"`);
        await queryRunner.query(`ALTER TABLE "reviews" RENAME COLUMN "reviweId" TO "reviewId"`);
        await queryRunner.query(`ALTER TABLE "reviews" RENAME CONSTRAINT "PK_ce469582ce66c7cc181aa1f785d" TO "PK_fded04e5e4fb901d8566443e6f1"`);
        await queryRunner.query(`ALTER SEQUENCE "reviews_reviweId_seq" RENAME TO "reviews_reviewId_seq"`);
        await queryRunner.query(`ALTER TABLE "products" RENAME COLUMN "garanty" TO "guarantee"`);
        await queryRunner.query(`ALTER TABLE "cities" ADD CONSTRAINT "FK_a7c1a801700048901c8e86d1a9e" FOREIGN KEY ("provinceId") REFERENCES "provinces"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD CONSTRAINT "FK_fcec2e72402c8ba8f8f32e6ac93" FOREIGN KEY ("provinceId") REFERENCES "provinces"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" DROP CONSTRAINT "FK_fcec2e72402c8ba8f8f32e6ac93"`);
        await queryRunner.query(`ALTER TABLE "cities" DROP CONSTRAINT "FK_a7c1a801700048901c8e86d1a9e"`);
        await queryRunner.query(`ALTER TABLE "products" RENAME COLUMN "guarantee" TO "garanty"`);
        await queryRunner.query(`ALTER SEQUENCE "reviews_reviewId_seq" RENAME TO "reviews_reviweId_seq"`);
        await queryRunner.query(`ALTER TABLE "reviews" RENAME CONSTRAINT "PK_fded04e5e4fb901d8566443e6f1" TO "PK_ce469582ce66c7cc181aa1f785d"`);
        await queryRunner.query(`ALTER TABLE "reviews" RENAME COLUMN "reviewId" TO "reviweId"`);
        await queryRunner.query(`ALTER TABLE "addresses" RENAME COLUMN "provinceId" TO "proviceId"`);
        await queryRunner.query(`ALTER TABLE "cities" RENAME COLUMN "provinceId" TO "proviceId"`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD CONSTRAINT "FK_e4662d9bf2fdb338b7a268ea194" FOREIGN KEY ("proviceId") REFERENCES "provinces"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cities" ADD CONSTRAINT "FK_72fc137b761ba428ffadff3a715" FOREIGN KEY ("proviceId") REFERENCES "provinces"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
