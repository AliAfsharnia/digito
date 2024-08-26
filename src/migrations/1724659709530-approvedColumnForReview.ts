import { MigrationInterface, QueryRunner } from "typeorm";

export class ApprovedColumnForReview1724659709530 implements MigrationInterface {
    name = 'ApprovedColumnForReview1724659709530'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reviews" ADD "approved" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reviews" DROP COLUMN "approved"`);
    }

}
