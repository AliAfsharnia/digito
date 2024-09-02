import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsers1724232237551 implements MigrationInterface {
    name = 'CreateUsers1724232237551'

    public async up(queryRunner: QueryRunner): Promise<void> {
       await queryRunner.query(`INSERT INTO "products" ( title, slug, "stockCount", images, colors, "brandBrandId", "categoryCategoryId", price) VALUES ('product1', 'product1-cnlffd', 0, 'url1,url2', 'red, blue', 1, 1, 0), ('product2', 'product2-cnlffd', 0, 'url1,url2', 'red, blue', 1, 2, 0), ('product3', 'product3-l1xp2i', 0, 'url1,url2', 'red, blue', 2, 2, 0), ('product4', 'product4-7e5fld', 0, 'url1,url2', 'red, blue', 2, 2, 0)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
