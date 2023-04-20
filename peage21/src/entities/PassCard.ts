import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { User } from "./User";
import { UsageRecord } from "./UsageRecord";


@Entity()
export class PassCard{

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    cardID!: string;

    @Column('date')
    creationDate!: Date;

    @Column('bool')
    isActivated!: boolean;

    @OneToOne(() => User)
    @JoinColumn()
    cardOwner!: User;

    @OneToMany(() => UsageRecord, u => u.passCard)
    usageRecords!: UsageRecord[];
}