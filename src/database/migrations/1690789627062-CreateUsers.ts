import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsers1690789627062 implements MigrationInterface {
    name = 'CreateUsers1690789627062'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tags" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "registrationDate" TIMESTAMP WITH TIME ZONE NOT NULL, "firstName" character varying(100) NOT NULL, "lastName" character varying(100) NOT NULL, "password" character varying(70) NOT NULL, "email" character varying(255) NOT NULL, "phone" character varying(20), "avatar" character varying, "isActivated" boolean NOT NULL DEFAULT false, "forgotPasswordLink" character varying, "expiredForgotPasswordDate" TIMESTAMP WITH TIME ZONE, "role" character varying NOT NULL DEFAULT 'guest', "accountStatus" character varying NOT NULL DEFAULT 'active', "userName" character varying(200), "dataOfBorn" TIMESTAMP WITH TIME ZONE, "isSubscribe" boolean NOT NULL DEFAULT false, "lastLogin" TIMESTAMP WITH TIME ZONE NOT NULL, "deletedAt" TIMESTAMP WITH TIME ZONE NOT NULL, "banReason" character varying(200), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_226bb9aa7aa8a69991209d58f59" UNIQUE ("userName"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a3ffb1c0c8416b9fc6f907b743" ON "users" ("id") `);
        await queryRunner.query(`CREATE INDEX "IDX_7aa9f28bb31377f4dc35e4005c" ON "users" ("email", "role", "accountStatus", "isSubscribe") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_7aa9f28bb31377f4dc35e4005c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a3ffb1c0c8416b9fc6f907b743"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "tags"`);
    }

}
