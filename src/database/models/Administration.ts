import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("administration")
export class Administration extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'date', name: 'report_date' })
    report_date!: Date;

    @Column({ type: 'int', name: 'total_entries' })
    total_entries!: number;

    @Column({ type: 'int', name: 'total_absences' })
    total_absences!: number;

    @Column({ type: 'text', name: 'frequent_users' })
    frequent_users!: string;

    @Column({ type: 'text', name: 'infrequent_users' })
    infrequent_users!: string;
}