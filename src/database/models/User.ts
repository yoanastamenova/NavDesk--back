import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Booking } from './Booking';
import { Booking_History } from "./Booking_history";

@Entity("user")
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'username'})
    username!: string;

    @Column({ name: 'email'})
    email!: string;

    @Column({ name: 'password'})
    password!: string;

    @Column({
        name: 'role',
        type: 'enum',
        enum: ['user', 'admin'],
        default: 'user'
    })
    role!: 'user' | 'admin';

    @Column({ name: 'startup'})
    startup!: string;

    @Column({ name: 'dni'})
    dni!: string;

    @Column({ name: 'phone' })
    phone!: string;

    @OneToMany(() => Booking, booking => booking.user)
    bookings!: Booking[];

    @OneToMany(() => Booking_History, bookingHistory => bookingHistory.user)
    bookingHistory!: Booking_History[];
}