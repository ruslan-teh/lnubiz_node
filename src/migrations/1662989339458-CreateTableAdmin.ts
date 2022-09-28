import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableAdmin1662989339458 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS Admin (
                id INT PRIMARY KEY AUTO_INCREMENT,
                userId INT NOT NULL,
                admin BOOLEAN,
                createdAt TIMESTAMP DEFAULT(UTC_TIMESTAMP()) NOT NULL,
                deletedAt TIMESTAMP,
                FOREIGN KEY (userId) REFERENCES Users (id)
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS Admin
        `);
    }
}
