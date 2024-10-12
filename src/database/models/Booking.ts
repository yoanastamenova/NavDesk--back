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
        enum: ["Reserved", "Checked-in", "Checked-out", "Cancelled"],
        default: "pending",
        name: 'state'
    })
    state!: "Reserved" | "Checked-in" | "Checked-out" | "Cancelled";
    
    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user!: User;

    @ManyToOne(() => Room)
    @JoinColumn({ name: 'room_id' })
    room!: Room;
}
