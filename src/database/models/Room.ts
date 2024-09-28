import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Access } from "./Access";
import { Access_History } from "./Access_history"; 

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

    @OneToMany(() => Access, access => access.room)
    accesses!: Access[];

    @OneToMany(() => Access_History, accessHistory => accessHistory.room)
    accessHistories!: Access_History[];
}
