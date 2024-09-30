import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Booking } from "./Booking";
import { Booking_History } from "./Booking_history";

@Entity("room")
export class Room extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'room_name' })
    room_name!: string;

    @Column({ name: 'capacity' })
    capacity!: number;

    @Column({
        name: 'room_type',
        type: "enum",
        enum: ["event", "meetup", "workshop", "office"],
        default: "event"
    })
    room_type!: 'event' | 'meetup' | 'workshop' | 'office';

    @Column({
        name: 'actual_state',
        type: "enum",
        enum: ["Available", "Occupied", "Non-bookable"],
        default: "event"
    })
    actual_state!: "Available" | "Occupied" | "Non-bookable";

    @OneToMany(() => Booking, booking => booking.room)
    bookings!: Booking[];

    @OneToMany(() => Booking_History, bookingHistory => bookingHistory.room)
    bookingHistories!: Booking_History[];
}
