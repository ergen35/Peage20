import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PassPoint } from "./PassPoint";
import { PassCard } from "./PassCard";


@Entity()
export class UsageRecord{

    @PrimaryGeneratedColumn()
    id!: number;

    @Column('date')
    usageDate: Date = new Date(Date.now())

    @Column('double')
    paidAmount!: number

    @ManyToOne(() => PassPoint, pp => pp.usageRecords)
    passPoint!: PassPoint

    @ManyToOne(() => PassCard, pc => pc.usageRecords)
    passCard!: PassCard;
}