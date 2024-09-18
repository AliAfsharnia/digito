import { MigrationInterface, QueryRunner } from "typeorm";

export class RemovedProvinceFromAddress1726646667323 implements MigrationInterface {
    name = 'RemovedProvinceFromAddress1726646667323'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" DROP CONSTRAINT "FK_fcec2e72402c8ba8f8f32e6ac93"`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "provinceId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" ADD "provinceId" integer`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD CONSTRAINT "FK_fcec2e72402c8ba8f8f32e6ac93" FOREIGN KEY ("provinceId") REFERENCES "provinces"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
