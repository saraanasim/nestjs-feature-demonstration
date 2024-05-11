import { Logger } from "@nestjs/common";
import { MigrationInterface, QueryRunner } from "typeorm";

export class PublicItems1715430501919 implements MigrationInterface {

    private readonly logger=new Logger(PublicItems1715430501919.name)

    public async up(queryRunner: QueryRunner): Promise<void> {
        this.logger.log('Runnung UP')
        await queryRunner.query('UPDATE item SET public = true')
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        this.logger.log('Runnung DOWN')
        await queryRunner.query('UPDATE item SET public = false')
    }

}
