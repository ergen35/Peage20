import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UsageRecord } from "./UsageRecord";
import { User } from "./User";


@Entity()
export class PassCard {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column('varchar', { default: '' })
    cardID!: string;

    @Column('double', { default: 0 })
    creationDate!: number

    @Column('bool', { default: false })
    isActivated!: boolean;

    @OneToOne(() => User, u => u.userCard)
    @JoinColumn()
    cardOwner!: User;

    @OneToMany(() => UsageRecord, u => u.passCard)
    usageRecords!: UsageRecord[];
}