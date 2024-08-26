import { MigrationInterface, QueryRunner } from "typeorm";

export class ReviewEmtityAndItsRelations1724652179363 implements MigrationInterface {
    name = 'ReviewEmtityAndItsRelations1724652179363'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "reviews" ("reviweId" SERIAL NOT NULL, "subject" character varying NOT NULL, "images" text NOT NULL, "rating" double precision NOT NULL, "context" character varying NOT NULL DEFAULT '', "productProductId" integer, "userUserId" integer, CONSTRAINT "PK_ce469582ce66c7cc181aa1f785d" PRIMARY KEY ("reviweId"))`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_c6b38625b22af78f04fbf423e74" FOREIGN KEY ("productProductId") REFERENCES "products"("productId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_0b1691cd039bba22ef1c12f538a" FOREIGN KEY ("userUserId") REFERENCES "users"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_0b1691cd039bba22ef1c12f538a"`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_c6b38625b22af78f04fbf423e74"`);
        await queryRunner.query(`DROP TABLE "reviews"`);
    }

}
