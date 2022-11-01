import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1667330703445 implements MigrationInterface {
    name = 'createTables1667330703445'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(120) NOT NULL, "password" character varying(240) NOT NULL, "name" character varying(200) NOT NULL, "username" character varying(200) NOT NULL, "position" character varying(100) NOT NULL, "imageUrl" character varying, CONSTRAINT "PK_951b8f1dfc94ac1d0301a14b7e1" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "customers" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(240) NOT NULL, "isCompany" boolean DEFAULT false, "email" character varying(120), "contact" character varying(50), CONSTRAINT "PK_a41cc8fde9ac3d9bcb91412c596" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`CREATE TABLE "budgetStack" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "stack" character varying(120) NOT NULL, CONSTRAINT "UQ_2532715d562ca5d2fc445b96169" UNIQUE ("stack"), CONSTRAINT "PK_c062a0956228d3c7e2ee954c8b6" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`CREATE TABLE "budgets" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "projectName" character varying(240) NOT NULL, "projectTime" integer NOT NULL, "budget" numeric(12,2) NOT NULL, "fixedCost" numeric(12,2) NOT NULL, "variableCost" numeric(12,2) NOT NULL, "userUuid" uuid, "categoryId" uuid, "customerUuid" uuid, "budgetStackUuid" uuid, CONSTRAINT "PK_4d7c32c7471e1137ee82b9c6400" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`ALTER TABLE "budgets" ADD CONSTRAINT "FK_60419afc7347b1da0c1601b2996" FOREIGN KEY ("userUuid") REFERENCES "users"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "budgets" ADD CONSTRAINT "FK_3ece6e1292b7a86ba82145775a7" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "budgets" ADD CONSTRAINT "FK_e952000fb54670e270da05e908d" FOREIGN KEY ("customerUuid") REFERENCES "customers"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "budgets" ADD CONSTRAINT "FK_550f9bff17934df87f24161b371" FOREIGN KEY ("budgetStackUuid") REFERENCES "budgetStack"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "budgets" DROP CONSTRAINT "FK_550f9bff17934df87f24161b371"`);
        await queryRunner.query(`ALTER TABLE "budgets" DROP CONSTRAINT "FK_e952000fb54670e270da05e908d"`);
        await queryRunner.query(`ALTER TABLE "budgets" DROP CONSTRAINT "FK_3ece6e1292b7a86ba82145775a7"`);
        await queryRunner.query(`ALTER TABLE "budgets" DROP CONSTRAINT "FK_60419afc7347b1da0c1601b2996"`);
        await queryRunner.query(`DROP TABLE "budgets"`);
        await queryRunner.query(`DROP TABLE "budgetStack"`);
        await queryRunner.query(`DROP TABLE "customers"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
