import { MigrationInterface, QueryRunner } from "typeorm";

export class QuantityForOrderAndtotalPriceForItems1726689320457 implements MigrationInterface {
    name = 'QuantityForOrderAndtotalPriceForItems1726689320457'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_products" ADD "totalPrice" numeric NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "quantity" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "order_products" ALTER COLUMN "quantity" SET DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_products" ALTER COLUMN "quantity" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "quantity"`);
        await queryRunner.query(`ALTER TABLE "order_products" DROP COLUMN "totalPrice"`);
    }

}
