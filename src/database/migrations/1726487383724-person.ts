import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Person1726487383724 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "person",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "first_name",
                        type: "varchar",
                        length: "100",
                        isNullable: false
                    },
                    {
                        name: "last_name",
                        type: "varchar",
                        length: "100",
                        isNullable: false
                    },
                    {
                        name: "statrup",
                        type: "varchar",
                        length: "100",
                        isNullable: false
                    }
                ]
            }),
            true
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('person')
    }

}
