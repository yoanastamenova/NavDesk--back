import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Access } from "./Access"
import { Access_History } from "./Access_history"; 

@Entity("user")
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ name: 'first_name'})
    first_name!: string

    @Column({ name: 'last_name'})
    last_name!: string

    @Column({ name: 'email'})
    email!: string

    @Column({ name: 'password'})
    password!: string

    @Column({
        name: 'role',
        type: "enum",
        enum: ["user", "admin"],
        default: "user"
    })
    role!: 'user' | 'admin';

    @Column({ name: 'startup'})
    startup!: string

    @Column({ name: 'dni'})
    dni!: string

    @Column({ name: 'phone'})
    phone!: string

    @OneToMany(() => Access, access => access.user)
    accesses!: Access[];

    @OneToMany(() => Access_History, accessHistory => accessHistory.user)
    accessHistories!: Access_History[];
}
