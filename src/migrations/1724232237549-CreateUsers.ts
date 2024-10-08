import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsers1724232237549 implements MigrationInterface {
    name = 'CreateUsers1724232237549'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("userId" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "bio" character varying NOT NULL DEFAULT '', "image" character varying NOT NULL DEFAULT '', "password" character varying NOT NULL, "isAdmin" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_8bf09ba754322ab9c22a215c919" PRIMARY KEY ("userId"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
