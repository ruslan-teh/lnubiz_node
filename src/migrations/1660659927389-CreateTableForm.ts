import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableForm1660659927389 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS Forms (
                id INT PRIMARY KEY AUTO_INCREMENT,
                userId INT NOT NULL, 
                date DATE NOT NULL,
                status INT NOT NULL,
                fullName VARCHAR(255) NOT NULL,
                fullTimePosition VARCHAR(255) NOT NULL,
                partTimePosition VARCHAR(255) NOT NULL,
                isAbroadTrip BOOLEAN NOT NULL,
                purpose VARCHAR(255) NOT NULL,
                retentionType INT NOT NULL,
                city VARCHAR(255) NOT NULL,
                country VARCHAR(255) NOT NULL,
                institution VARCHAR(255) NOT NULL,
                startDate DATE NOT NULL,
                endDate DATE NOT NULL,
                route VARCHAR(255) NOT NULL,
                transport VARCHAR(255) NOT NULL,
                expensesPayment VARCHAR(255) NOT NULL,
                tripReason VARCHAR(255) NOT NULL,
                createdAt TIMESTAMP DEFAULT(UTC_TIMESTAMP()) NOT NULL,
                deletedAt TIMESTAMP,
                FOREIGN KEY (userId) REFERENCES Users (id)
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS Forms
        `);
    }
}
