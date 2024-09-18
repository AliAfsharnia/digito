import { MigrationInterface, QueryRunner } from "typeorm";

export class AttributesTable1726680218819 implements MigrationInterface {
    name = 'AttributesTable1726680218819'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "attributes" ("id" SERIAL NOT NULL, "key" character varying NOT NULL, "value" character varying NOT NULL DEFAULT '0', "productId" integer, CONSTRAINT "PK_32216e2e61830211d3a5d7fa72c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "attributes" ADD CONSTRAINT "FK_2161c27ae1c917301af344493e7" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "attributes" DROP CONSTRAINT "FK_2161c27ae1c917301af344493e7"`);
        await queryRunner.query(`DROP TABLE "attributes"`);
    }

}
