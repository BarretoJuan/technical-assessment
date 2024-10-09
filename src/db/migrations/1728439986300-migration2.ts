import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration21728439986300 implements MigrationInterface {
    name = 'Migration21728439986300'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` CHANGE \`description\` \`description\` text NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` CHANGE \`description\` \`description\` text NULL DEFAULT 'NULL'`);
    }

}
