import { MigrationInterface, QueryRunner } from "typeorm";

export class Test31728404565173 implements MigrationInterface {
    name = 'Test31728404565173'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` CHANGE \`description\` \`description3\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`description3\``);
        await queryRunner.query(`ALTER TABLE \`task\` ADD \`description3\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`description3\``);
        await queryRunner.query(`ALTER TABLE \`task\` ADD \`description3\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`task\` CHANGE \`description3\` \`description\` varchar(255) NOT NULL`);
    }

}
