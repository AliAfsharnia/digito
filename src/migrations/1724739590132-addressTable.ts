import { MigrationInterface, QueryRunner } from "typeorm";

export class AddressTable1724739590132 implements MigrationInterface {
    name = 'AddressTable1724739590132'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "addresses" ("addressId" SERIAL NOT NULL, "country" character varying NOT NULL, "state" character varying NOT NULL, "city" character varying NOT NULL, "street" character varying NOT NULL, "tag" character varying NOT NULL, "userUserId" integer, CONSTRAINT "PK_ff59275f5928941ce06f1d8890c" PRIMARY KEY ("addressId"))`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD CONSTRAINT "FK_0cb4a718cc49a5bc41bf4f950e8" FOREIGN KEY ("userUserId") REFERENCES "users"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" DROP CONSTRAINT "FK_0cb4a718cc49a5bc41bf4f950e8"`);
        await queryRunner.query(`DROP TABLE "addresses"`);
    }

}
