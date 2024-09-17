import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./User"
import { Room } from "./Room"

@Entity("access_history")
export class Access_history extends BaseEntity{
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

    @ManyToOne(() => User, user => user.accessHistories)
    @JoinColumn({ name: 'user_id' })
    user!: User;

    @ManyToOne(() => Room, room => room.accessHistories)
    @JoinColumn({ name: 'room_id' })
    room!: Room;
}
