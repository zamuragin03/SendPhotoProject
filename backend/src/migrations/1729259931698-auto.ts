import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1729259931698 implements MigrationInterface {
    name = 'Auto1729259931698'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "balance" SET DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "balance" DROP DEFAULT`);
    }

}
