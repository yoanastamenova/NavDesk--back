import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Access } from "./Access"

@Entity()
export class Person {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ name: 'first_name'})
    first_name!: string

    @Column({ name: 'last_name'})
    last_name!: string

    @Column({ name: 'startup'})
    startup!: string

    @Column({ name: 'email'})
    email!: string

    @Column({ name: 'dni'})
    dni!: string

    @Column({ name: 'phone'})
    phone!: string

    @OneToMany(() => Access, access => access.person)
    accesses!: Access[];
}
