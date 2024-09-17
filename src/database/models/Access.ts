import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Person } from "./Person"
import { Room } from "./Room"

@Entity("access")
export class Access extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ name: 'person_id'})
    person_id!: number

    @Column({ name: 'room_id'})
    room_id!: number

    @Column({ name: 'entry_datetime'})
    entry_datetime!: Date

    @Column({ name: 'exit_datetime'})
    exit_datetime!: Date

    @Column({
        type: "enum",
        enum: ["approved", "denied", "pending"],
        default: "pending",
        name: 'state'
    })
    state!: 'approved' | 'denied' | 'pending';

    @ManyToOne(() => Person)
    @JoinColumn({ name: 'person_id' })
    person!: Person;

    @ManyToOne(() => Room)
    @JoinColumn({ name: 'room_id' })
    room!: Room;
}
