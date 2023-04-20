import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { TransactionStatus } from "./TransactionStatus";


@Entity()
export class TransactionOperation{

    @PrimaryGeneratedColumn()
    id!: number
    
    @Column('varchar')
    transactionID!: string

    @Column('text')
    hash!: string

    @Column('date')
    initiatedOn!: Date 

    @Column('double')
    amount!: number

    @ManyToOne(() => User, u => u.userTransactions)
    transactionActor!: User

    @Column('varchar')
    status: string = TransactionStatus.pending.toString() 
}