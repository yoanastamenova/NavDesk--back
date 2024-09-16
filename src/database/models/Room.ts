import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Access } from "./Access";

@Entity()
export class Room {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'room_name' })
    room_name!: string;

    @Column({ name: 'capacity' })
    capacity!: number;

    @Column({ name: 'room_type' })
    room_type!: string;

    @OneToMany(() => Access, access => access.room)
    accesses!: Access[];
}
