import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PassCard } from "./PassCard";
import { PassPoint } from "./PassPoint";


@Entity()
export class UsageRecord {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column('timestamp')
    usageDate!: Date

    @Column('double precision', { default: 0.0 })
    paidAmount!: number

    @ManyToOne(() => PassPoint, pp => pp.usageRecords)
    passPoint!: PassPoint

    @ManyToOne(() => PassCard, pc => pc.usageRecords)
    passCard!: PassCard;
}