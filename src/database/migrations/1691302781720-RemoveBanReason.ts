import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveBanReason1691302781720 implements MigrationInterface {
    name = 'RemoveBanReason1691302781720'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "banReason"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "banReason" character varying(200)`);
    }

}
