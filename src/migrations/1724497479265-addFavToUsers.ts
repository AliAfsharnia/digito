import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFavToUsers1724497479265 implements MigrationInterface {
    name = 'AddFavToUsers1724497479265'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users_favorites_products" ("usersUserId" integer NOT NULL, "productsProductId" integer NOT NULL, CONSTRAINT "PK_4337cabb52564d50419af2e61c8" PRIMARY KEY ("usersUserId", "productsProductId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b3af5cda70ec705b57386a69bd" ON "users_favorites_products" ("usersUserId") `);
        await queryRunner.query(`CREATE INDEX "IDX_b1712467cdce5b5567e03a34cb" ON "users_favorites_products" ("productsProductId") `);
        await queryRunner.query(`ALTER TABLE "products" ADD "favoritesCount" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "users_favorites_products" ADD CONSTRAINT "FK_b3af5cda70ec705b57386a69bd2" FOREIGN KEY ("usersUserId") REFERENCES "users"("userId") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_favorites_products" ADD CONSTRAINT "FK_b1712467cdce5b5567e03a34cb3" FOREIGN KEY ("productsProductId") REFERENCES "products"("productId") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_favorites_products" DROP CONSTRAINT "FK_b1712467cdce5b5567e03a34cb3"`);
        await queryRunner.query(`ALTER TABLE "users_favorites_products" DROP CONSTRAINT "FK_b3af5cda70ec705b57386a69bd2"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "favoritesCount"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b1712467cdce5b5567e03a34cb"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b3af5cda70ec705b57386a69bd"`);
        await queryRunner.query(`DROP TABLE "users_favorites_products"`);
    }

}
