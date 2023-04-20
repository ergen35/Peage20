import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";


@Entity()
export class AppUserSession {

    @PrimaryGeneratedColumn('uuid')
    id!: string

    @OneToOne(() => User, u => u.session)
    @JoinColumn()
    user!: User

    @Column('text', { unique: true })
    hash!: string
}