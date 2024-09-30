import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class User1726487383724 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "user",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "username",
                        type: "varchar",
                        length: "100",
                        isNullable: true
                    },
                    {
                        name: "email",
                        type: "varchar",
                        length: "100",
                        isNullable: false,
                        isUnique: true
                    },
                    {
                        name: "password",
                        type: "varchar",
                        length: "255",
                        isNullable: false
                    },
                    {
                        name: "role",
                        type: "enum",
                        enum: ["user", "admin"]
                    },
                    {
                        name: "startup",
                        type: "varchar",
                        length: "100",
                        isNullable: true
                    },
                    {
                        name: "DNI",
                        type: "varchar",
                        length: "20",
                        isNullable: true,
                        isUnique: true
                    },
                    {
                        name: "phone",
                        type: "varchar",
                        length: "20",
                        isNullable: true
                    }
                ]
            }),
            true
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('user')
    }

}
