import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Room } from "./Room";
import { User } from "./User";

@Entity("access_history")
export class Access_History extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'int', name: 'user_id' })
    user_id!: number;

    @Column({ type: 'int', name: 'room_id' })
    room_id!: number;

    @Column({ type: 'datetime', name: 'entry_datetime' })
    entry_datetime!: Date;

    @Column({ type: 'datetime', name: 'exit_datetime' })
    exit_datetime!: Date;

    @Column({
        type: "enum",
        enum: ["reserved", "no-show", "completed", "cancelled"],
        name: 'access_state'
    })
    access_state!: "reserved" | "no-show" | "completed" | "cancelled";

    @ManyToOne(() => User, user => user.accessHistories)
    @JoinColumn({ name: 'user_id' })
    user!: User;

    @ManyToOne(() => Room, room => room.accessHistories)
    @JoinColumn({ name: 'room_id' })
    room!: Room;
}