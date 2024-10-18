import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1727973947782 implements MigrationInterface {
  name = "Auto1727973947782";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "profile_type" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "amount" integer NOT NULL, "isVerified" boolean NOT NULL, CONSTRAINT "PK_7047b934cd27af7388e3620ae21" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "login" character varying NOT NULL, "password" character varying NOT NULL, "balance" character varying NOT NULL, "photo" character varying NOT NULL, "description" character varying NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "profileTypeId" integer NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "withdraw" ("id" SERIAL NOT NULL, "amount" integer NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "REL_6be178fe0b1980b73dfe30c1b7" UNIQUE ("userId"), CONSTRAINT "PK_5c172f81689173f75bf5906ef22" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE TYPE "public"."file_mediatype_enum" AS ENUM('photo', 'video')`);
    await queryRunner.query(
      `CREATE TABLE "file" ("id" SERIAL NOT NULL, "path" character varying NOT NULL, "mediaType" "public"."file_mediatype_enum" NOT NULL, CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "folder" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "price" integer NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_6278a41a706740c94c02e288df8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "transaction" ("id" SERIAL NOT NULL, "amount" integer NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "sellerId" uuid NOT NULL, "payerId" uuid NOT NULL, "folderId" integer NOT NULL, CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "payment" ("id" SERIAL NOT NULL, "amount" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userId" uuid NOT NULL, CONSTRAINT "REL_b046318e0b341a7f72110b7585" UNIQUE ("userId"), CONSTRAINT "PK_fcaec7df5adf9cac408c686b2ab" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "folder_files_file" ("folderId" integer NOT NULL, "fileId" integer NOT NULL, CONSTRAINT "PK_69b5967ee73acd51dbc8891f1ee" PRIMARY KEY ("folderId", "fileId"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_f4311d14b53fcbc5744d9eefaa" ON "folder_files_file" ("folderId") `);
    await queryRunner.query(`CREATE INDEX "IDX_22a7efc685759536e250b956be" ON "folder_files_file" ("fileId") `);
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_3536aac4d2387b465145047f1c5" FOREIGN KEY ("profileTypeId") REFERENCES "profile_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "withdraw" ADD CONSTRAINT "FK_6be178fe0b1980b73dfe30c1b7b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction" ADD CONSTRAINT "FK_da429de57e23852dae37f1d182b" FOREIGN KEY ("sellerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction" ADD CONSTRAINT "FK_e32e0d2862e47419a5bb7370787" FOREIGN KEY ("payerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction" ADD CONSTRAINT "FK_c97866d1bec872eb9cbaba0ef65" FOREIGN KEY ("folderId") REFERENCES "folder"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "payment" ADD CONSTRAINT "FK_b046318e0b341a7f72110b75857" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "folder_files_file" ADD CONSTRAINT "FK_f4311d14b53fcbc5744d9eefaa9" FOREIGN KEY ("folderId") REFERENCES "folder"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "folder_files_file" ADD CONSTRAINT "FK_22a7efc685759536e250b956be9" FOREIGN KEY ("fileId") REFERENCES "file"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "folder_files_file" DROP CONSTRAINT "FK_22a7efc685759536e250b956be9"`);
    await queryRunner.query(`ALTER TABLE "folder_files_file" DROP CONSTRAINT "FK_f4311d14b53fcbc5744d9eefaa9"`);
    await queryRunner.query(`ALTER TABLE "payment" DROP CONSTRAINT "FK_b046318e0b341a7f72110b75857"`);
    await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_c97866d1bec872eb9cbaba0ef65"`);
    await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_e32e0d2862e47419a5bb7370787"`);
    await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_da429de57e23852dae37f1d182b"`);
    await queryRunner.query(`ALTER TABLE "withdraw" DROP CONSTRAINT "FK_6be178fe0b1980b73dfe30c1b7b"`);
    await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_3536aac4d2387b465145047f1c5"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_22a7efc685759536e250b956be"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_f4311d14b53fcbc5744d9eefaa"`);
    await queryRunner.query(`DROP TABLE "folder_files_file"`);
    await queryRunner.query(`DROP TABLE "payment"`);
    await queryRunner.query(`DROP TABLE "transaction"`);
    await queryRunner.query(`DROP TABLE "folder"`);
    await queryRunner.query(`DROP TABLE "file"`);
    await queryRunner.query(`DROP TYPE "public"."file_mediatype_enum"`);
    await queryRunner.query(`DROP TABLE "withdraw"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "profile_type"`);
  }
}
