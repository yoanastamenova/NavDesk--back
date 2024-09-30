import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Report1726487446253 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "report",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "report_date",
                        type: "date",
                        isNullable: false
                    },
                    {
                        name: "total_bookings",
                        type: "int"
                    },
                    {
                        name: "total_cancelations",
                        type: "int"
                    },
                    {
                        name: "frequent_users",
                        type: "varchar"
                    },
                    {
                        name: "infrequent_users",
                        type: "varchar"
                    }
                ]
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("report");
    }
}