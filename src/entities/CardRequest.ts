import { Entity, Column, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";


@Entity()
export class CardRequest{

    @PrimaryGeneratedColumn('uuid')
    id!: string

    @OneToOne(() => User, u => u.cardRequest)
    @JoinColumn()
    requestMaker!: User
    
    @Column('double')
    requestDate!: number

    @Column('varchar')
    requestStatus: 'no-status' | 'pending' | 'rejected' | 'accepted' = 'no-status';
}