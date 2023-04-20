import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UsageRecord } from "./UsageRecord";
import { User } from "./User";


@Entity()
export class PassCard {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column('varchar')
    name!: string;

    @Column('varchar')
    cardID!: string;

    @Column('date')
    creationDate!: Date;

    @Column('bool')
    isActivated!: boolean;

    @OneToOne(() => User, u => u.passCard)
    @JoinColumn()
    cardOwner!: User;

    @OneToMany(() => UsageRecord, u => u.passCard)
    usageRecords!: UsageRecord[];
}