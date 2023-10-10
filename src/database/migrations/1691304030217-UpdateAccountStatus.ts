import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateAccountStatus1691304030217 implements MigrationInterface {
    name = 'UpdateAccountStatus1691304030217'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_7aa9f28bb31377f4dc35e4005c"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('customer', 'guest', 'premium-customer')`);
        await queryRunner.query(`ALTER TABLE "users" ADD "role" "public"."users_role_enum" NOT NULL DEFAULT 'guest'`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "accountStatus"`);
        await queryRunner.query(`CREATE TYPE "public"."users_accountstatus_enum" AS ENUM('active', 'blocked', 'deleted', 'inactive')`);
        await queryRunner.query(`ALTER TABLE "users" ADD "accountStatus" "public"."users_accountstatus_enum" NOT NULL DEFAULT 'inactive'`);
        await queryRunner.query(`CREATE INDEX "IDX_7aa9f28bb31377f4dc35e4005c" ON "users" ("email", "role", "accountStatus", "isSubscribe") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_7aa9f28bb31377f4dc35e4005c"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "accountStatus"`);
        await queryRunner.query(`DROP TYPE "public"."users_accountstatus_enum"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "accountStatus" character varying NOT NULL DEFAULT 'active'`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "role" character varying NOT NULL DEFAULT 'guest'`);
        await queryRunner.query(`CREATE INDEX "IDX_7aa9f28bb31377f4dc35e4005c" ON "users" ("email", "role", "accountStatus", "isSubscribe") `);
    }

}
