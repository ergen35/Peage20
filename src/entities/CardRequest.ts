import 'reflect-metadata'

import { Entity, Column, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";


@Entity()
export class CardRequest{

    @PrimaryGeneratedColumn()
    id!: number

    @OneToOne(() => User, u => u.cardRequest)
    @JoinColumn()
    requestMaker!: User
    
    @Column('timestamp')
    requestDate!: Date

    @Column('varchar')
    requestStatus: 'no-status' | 'pending' | 'rejected' | 'accepted' = 'no-status';

    @Column('varchar', { default: "", unique: true })
    requestTicket!: string
}