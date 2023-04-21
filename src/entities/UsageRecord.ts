import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PassCard } from "./PassCard";
import { PassPoint } from "./PassPoint";


@Entity()
export class UsageRecord {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column('double', { default: 0 })
    usageDate!: number

    @Column('double', { default: 0.0 })
    paidAmount!: number

    @ManyToOne(() => PassPoint, pp => pp.usageRecords)
    passPoint!: PassPoint

    @ManyToOne(() => PassCard, pc => pc.usageRecords)
    passCard!: PassCard;
}