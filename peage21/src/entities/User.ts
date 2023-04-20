import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PassCard } from "./PassCard";
import { TransactionOperation } from "./TransactionOperation";

@Entity()
export class User{

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    fisrtName!: string;

    @Column()
    lastName!: string;

    @Column('text')
    passwordHash!: string

    @Column('float64')
    accountBalance!: number;

    @Column('date')
    registrationDate!: Date;

    @Column({ length: 1024 })
    address!: string;

    @Column('bool')
    accountActivated = false

    @Column('date')
    lastAccessDate!: Date;

    @OneToOne(() => PassCard,  {cascade: ['remove', "soft-remove"]})
    userCard!: PassCard

    @OneToOne(() => PassCard, pc => pc.cardOwner)
    passCard!: PassCard;

    @OneToMany(() => TransactionOperation, t => t.transactionActor)
    userTransactions!: TransactionOperation[]
}