import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";


@Entity()
export class TransactionOperation{

    @PrimaryGeneratedColumn()
    id!: number
    
    @Column()
    transactionID!: string

    @Column('text')
    hash!: string

    @Column('date')
    initiatedOn!: Date

    @Column('double')
    amount!: number

    @ManyToOne(() => User, u => u.userTransactions)
    transactionActor!: User
}