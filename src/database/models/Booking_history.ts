import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Room } from "./Room";
import { User } from "./User";

@Entity("booking_history")
export class Booking_History extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'user_id' })
    user_id!: number;

    @Column({ name: 'room_id' })
    room_id!: number;

    @Column({ name: 'start_time' })
    entry_datetime!: Date;

    @Column({ name: 'end_time' })
    exit_datetime!: Date;

    @Column({
        type: "enum",
        enum: ["reserved", "no-show", "completed", "cancelled"],
        name: 'state'
    })
    access_state!: "reserved" | "no-show" | "completed" | "cancelled";

    @ManyToOne(() => User, user => user.bookingHistory)
    @JoinColumn({ name: 'user_id' })
    user!: User;

    @ManyToOne(() => Room, room => room.bookingHistories)
    @JoinColumn({ name: 'room_id' })
    room!: Room;
}