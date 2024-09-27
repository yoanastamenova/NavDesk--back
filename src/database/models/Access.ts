import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./User"
import { Room } from "./Room"

@Entity("access")
export class Access extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ name: 'user_id'})
    user_id!: number

    @Column({ name: 'room_id'})
    room_id!: number

    @Column({ name: 'entry_datetime'})
    entry_datetime!: Date

    @Column({ name: 'exit_datetime'})
    exit_datetime!: Date

    @Column({
        type: "enum",
        enum: ["reserved", "checked-in", "checked-out", "cancelled"],
        default: "pending",
        name: 'state'
    })
    state!: "reserved" | "checked-in" | "checked-out" | "cancelled";

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user!: User;

    @ManyToOne(() => Room)
    @JoinColumn({ name: 'room_id' })
    room!: Room;
}
