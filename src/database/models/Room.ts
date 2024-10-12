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
        enum: ["Event", "Meetup", "Workshop", "Office"],
        default: "Event"
    })
    room_type!: 'Event' | 'Meetup' | 'Workshop' | 'Office';

    @Column({
        name: 'actual_state',
        type: "enum",
        enum: ["Available", "Occupied", "Non-bookable"],
        default: "Event"
    })
    actual_state!: "Available" | "Occupied" | "Non-bookable";

    @OneToMany(() => Booking, booking => booking.room)
    bookings!: Booking[];

    @OneToMany(() => Booking_History, bookingHistory => bookingHistory.room)
    bookingHistories!: Booking_History[];
}
