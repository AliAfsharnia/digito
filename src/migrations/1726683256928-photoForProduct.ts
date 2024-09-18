import { MigrationInterface, QueryRunner } from "typeorm";

export class PhotoForProduct1726683256928 implements MigrationInterface {
    name = 'PhotoForProduct1726683256928'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product_photos" ("id" SERIAL NOT NULL, "image" character varying NOT NULL, "productId" integer, CONSTRAINT "PK_0586e8a3f1766827efaf0ee3943" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "images"`);
        await queryRunner.query(`ALTER TABLE "product_photos" ADD CONSTRAINT "FK_9c18967daa2898d149078cb8282" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_photos" DROP CONSTRAINT "FK_9c18967daa2898d149078cb8282"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "images" text NOT NULL`);
        await queryRunner.query(`DROP TABLE "product_photos"`);
    }

}
