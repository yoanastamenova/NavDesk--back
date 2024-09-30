import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./User"
import { Room } from "./Room"

@Entity("booking")
export class Booking extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ name: 'user_id'})
    user_id!: number

    @Column({ name: 'room_id'})
    room_id!: number

    @Column({ name: 'start_time'})
    entry_datetime!: Date

    @Column({ name: 'end_time'})
    exit_datetime!: Date

    @Column({
        type: "enum",
        enum: ["reserved", "checked-in", "checked-out", "cancelled"],
        default: "pending",
        name: 'state'
    })
    state!: "reserved" | "checked-in" | "checked-out" | "cancelled";

    @Column({ name: 'current_occupants'})
    current_occupants!: number
    
    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user!: User;

    @ManyToOne(() => Room)
    @JoinColumn({ name: 'room_id' })
    room!: Room;
}
