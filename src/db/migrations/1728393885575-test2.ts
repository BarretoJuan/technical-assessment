import { MigrationInterface, QueryRunner } from "typeorm";

export class Test21728393885575 implements MigrationInterface {
    name = 'Test21728393885575'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` CHANGE \`description2\` \`description\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`task\` ADD \`description\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`task\` ADD \`description\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`task\` CHANGE \`description\` \`description2\` varchar(255) NOT NULL`);
    }

}
