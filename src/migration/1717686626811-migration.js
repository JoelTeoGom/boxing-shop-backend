const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Migration1717686626811 {
    name = 'Migration1717686626811'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" text NOT NULL, "image" character varying NOT NULL, "price" numeric NOT NULL, "brand" character varying NOT NULL, "category" character varying NOT NULL, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "productId" integer NOT NULL, "quantity" integer NOT NULL, "total" numeric NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "manoplas" ("id" SERIAL NOT NULL, "productId" integer NOT NULL, "stock" integer NOT NULL, CONSTRAINT "UQ_dd33abd1d1990038ab65a722f00" UNIQUE ("productId"), CONSTRAINT "REL_dd33abd1d1990038ab65a722f0" UNIQUE ("productId"), CONSTRAINT "PK_f67de7fd9abd7edb4b3583e194d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "helmet" ("id" SERIAL NOT NULL, "productId" integer NOT NULL, "size" character varying NOT NULL, "stock" integer NOT NULL, CONSTRAINT "PK_484b91e3ef39a07f175758caac8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "heavybag" ("id" SERIAL NOT NULL, "productId" integer NOT NULL, "weight" numeric NOT NULL, "stock" integer NOT NULL, CONSTRAINT "UQ_f893aade1b09cbba932ea22e486" UNIQUE ("productId"), CONSTRAINT "REL_f893aade1b09cbba932ea22e48" UNIQUE ("productId"), CONSTRAINT "PK_d3e0ce12650e145b4c269b692ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "gloves" ("id" SERIAL NOT NULL, "productId" integer NOT NULL, "size" character varying NOT NULL, "stock" integer NOT NULL, CONSTRAINT "PK_a8d25252c316ad0292190b6efe0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "boots" ("id" SERIAL NOT NULL, "productId" integer NOT NULL, "size" character varying NOT NULL, "stock" integer NOT NULL, CONSTRAINT "PK_324d6a3aa253e7a6c45a022face" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "manoplas" ADD CONSTRAINT "FK_dd33abd1d1990038ab65a722f00" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "helmet" ADD CONSTRAINT "FK_e17950193e3b56b66d831590adc" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "heavybag" ADD CONSTRAINT "FK_f893aade1b09cbba932ea22e486" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "gloves" ADD CONSTRAINT "FK_ec517ba378f80b5c81ed44c2514" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "boots" ADD CONSTRAINT "FK_b02dbff74872b87bc5aef9b21db" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "boots" DROP CONSTRAINT "FK_b02dbff74872b87bc5aef9b21db"`);
        await queryRunner.query(`ALTER TABLE "gloves" DROP CONSTRAINT "FK_ec517ba378f80b5c81ed44c2514"`);
        await queryRunner.query(`ALTER TABLE "heavybag" DROP CONSTRAINT "FK_f893aade1b09cbba932ea22e486"`);
        await queryRunner.query(`ALTER TABLE "helmet" DROP CONSTRAINT "FK_e17950193e3b56b66d831590adc"`);
        await queryRunner.query(`ALTER TABLE "manoplas" DROP CONSTRAINT "FK_dd33abd1d1990038ab65a722f00"`);
        await queryRunner.query(`DROP TABLE "boots"`);
        await queryRunner.query(`DROP TABLE "gloves"`);
        await queryRunner.query(`DROP TABLE "heavybag"`);
        await queryRunner.query(`DROP TABLE "helmet"`);
        await queryRunner.query(`DROP TABLE "manoplas"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }
}
