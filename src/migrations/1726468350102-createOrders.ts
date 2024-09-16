import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOrders1726468350102 implements MigrationInterface {
    name = 'CreateOrders1726468350102'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "order_products" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL, "orderOrderId" integer, "productProductId" integer, CONSTRAINT "PK_3e59f094c2dc3310d585216a813" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders" ("orderId" SERIAL NOT NULL, "totalPrice" numeric NOT NULL, "orderDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "status" character varying(255) NOT NULL DEFAULT 'pending', "userId" integer, CONSTRAINT "PK_41ba27842ac1a2c24817ca59eaa" PRIMARY KEY ("orderId"))`);
        await queryRunner.query(`ALTER TABLE "order_products" ADD CONSTRAINT "FK_d0dd9f6e90ff16c2d4b234b2a01" FOREIGN KEY ("orderOrderId") REFERENCES "orders"("orderId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_products" ADD CONSTRAINT "FK_b036bf423c292acb655fe6f93e9" FOREIGN KEY ("productProductId") REFERENCES "products"("productId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1"`);
        await queryRunner.query(`ALTER TABLE "order_products" DROP CONSTRAINT "FK_b036bf423c292acb655fe6f93e9"`);
        await queryRunner.query(`ALTER TABLE "order_products" DROP CONSTRAINT "FK_d0dd9f6e90ff16c2d4b234b2a01"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TABLE "order_products"`);
    }

}
