import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration11728414714702 implements MigrationInterface {
    name = 'Migration11728414714702'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` CHANGE \`description\` \`description\` text NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` CHANGE \`description\` \`description\` text NULL DEFAULT 'NULL'`);
    }

}
