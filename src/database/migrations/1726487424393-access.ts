import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Access1726487424393 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        new Table({
            name: "access",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "person_id",
                    type: "int",
                    isNullable: false
                },
                {
                    name: "room_id",
                    type: "int",
                    isNullable: false
                },
                {
                    name: "entry_datetime",
                    type: "datetime"
                },
                {
                    name: "exit_datetime",
                    type: "datetime"
                },
                {
                    name: "state",
                    type: "enum",
                    enum: ["approved", "denied", "pending"]
                }
            ],
            foreignKeys: [
                {
                    columnNames: ["person_id"],
                    referencedTableName: "person",
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
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('access')
    }
}
