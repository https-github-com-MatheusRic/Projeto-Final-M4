import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1668033398258 implements MigrationInterface {
    name = 'createTables1668033398258'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" DROP CONSTRAINT "FK_9aa96ced3a512a8b9e485c8c223"`);
        await queryRunner.query(`ALTER TABLE "budgets" DROP CONSTRAINT "FK_60419afc7347b1da0c1601b2996"`);
        await queryRunner.query(`ALTER TABLE "budgets" DROP CONSTRAINT "FK_bf8aa431d24aa8f456e0cc07eaa"`);
        await queryRunner.query(`ALTER TABLE "budgets" DROP CONSTRAINT "FK_e952000fb54670e270da05e908d"`);
        await queryRunner.query(`ALTER TABLE "budgets" DROP CONSTRAINT "FK_550f9bff17934df87f24161b371"`);
        await queryRunner.query(`ALTER TABLE "customers" ADD CONSTRAINT "FK_9aa96ced3a512a8b9e485c8c223" FOREIGN KEY ("userUuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "budgets" ADD CONSTRAINT "FK_60419afc7347b1da0c1601b2996" FOREIGN KEY ("userUuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "budgets" ADD CONSTRAINT "FK_bf8aa431d24aa8f456e0cc07eaa" FOREIGN KEY ("categoryUuid") REFERENCES "categories"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "budgets" ADD CONSTRAINT "FK_e952000fb54670e270da05e908d" FOREIGN KEY ("customerUuid") REFERENCES "customers"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "budgets" ADD CONSTRAINT "FK_550f9bff17934df87f24161b371" FOREIGN KEY ("budgetStackUuid") REFERENCES "budgetStack"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "budgets" DROP CONSTRAINT "FK_550f9bff17934df87f24161b371"`);
        await queryRunner.query(`ALTER TABLE "budgets" DROP CONSTRAINT "FK_e952000fb54670e270da05e908d"`);
        await queryRunner.query(`ALTER TABLE "budgets" DROP CONSTRAINT "FK_bf8aa431d24aa8f456e0cc07eaa"`);
        await queryRunner.query(`ALTER TABLE "budgets" DROP CONSTRAINT "FK_60419afc7347b1da0c1601b2996"`);
        await queryRunner.query(`ALTER TABLE "customers" DROP CONSTRAINT "FK_9aa96ced3a512a8b9e485c8c223"`);
        await queryRunner.query(`ALTER TABLE "budgets" ADD CONSTRAINT "FK_550f9bff17934df87f24161b371" FOREIGN KEY ("budgetStackUuid") REFERENCES "budgetStack"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "budgets" ADD CONSTRAINT "FK_e952000fb54670e270da05e908d" FOREIGN KEY ("customerUuid") REFERENCES "customers"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "budgets" ADD CONSTRAINT "FK_bf8aa431d24aa8f456e0cc07eaa" FOREIGN KEY ("categoryUuid") REFERENCES "categories"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "budgets" ADD CONSTRAINT "FK_60419afc7347b1da0c1601b2996" FOREIGN KEY ("userUuid") REFERENCES "users"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "customers" ADD CONSTRAINT "FK_9aa96ced3a512a8b9e485c8c223" FOREIGN KEY ("userUuid") REFERENCES "users"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
