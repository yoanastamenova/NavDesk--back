import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class BookingHistory1726487434146 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "booking_history",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "user_id",
                        type: "int",
                        isNullable: false
                    },
                    {
                        name: "room_id",
                        type: "int",
                        isNullable: false
                    },
                    {
                        name: "start_time",
                        type: "datetime"
                    },
                    {
                        name: "end_time",
                        type: "datetime"
                    },
                    {
                        name: "state",
                        type: "enum",
                        enum: ["No-show", "Completed", "Cancelled"]
                    }
                ],
                foreignKeys: [
                    {
                        columnNames: ["user_id"],
                        referencedTableName: "user",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE"
                    },
                    {
                        columnNames: ["room_id"],
                        referencedTableName: "room",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE"
                    }
                ],
            }),
            true
        );
    }        
        public async down(queryRunner: QueryRunner): Promise<void> {
            await queryRunner.dropTable('booking_history')
        }
    }