import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("report")
export class Report extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'report_date' })
    report_date!: Date;

    @Column({ name: 'total_bookings' })
    total_entries!: number;

    @Column({ name: 'total_cancelations' })
    total_absences!: number;

    @Column({ name: 'frequent_users' })
    frequent_users!: string;

    @Column({ name: 'infrequent_users' })
    infrequent_users!: string;
}