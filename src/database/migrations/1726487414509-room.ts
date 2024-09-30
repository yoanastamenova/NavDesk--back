import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Room1726487414509 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "room",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "room_name",
                        type: "varchar",
                        length: "100",
                        isNullable: false
                    },
                    {
                        name: "capacity",
                        type: "int",
                        isNullable: false
                    },
                    {
                        name: "room_type",
                        type: "enum",
                        enum: ["event", "meetup", "workshop", "office"]
                    },
                    {
                        name: "actual_state",
                        type: "enum",
                        enum: ["Available", "Occupied", "Non-bookable"]
                    }
                ]
            }),
            true
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('room')
    }

}
