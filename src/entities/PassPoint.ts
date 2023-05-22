import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UsageRecord } from "./UsageRecord";
import { PassStation } from "./PassStation";

@Entity()
export class PassPoint {

    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column('text')
    name!: string;

    @Column('text')
    passDirection: 'going' | 'returning' = 'going'

    @Column('text', { default: '' })
    geoAddress?: string;

    @OneToMany(() => UsageRecord, u => u.passPoint)
    usageRecords?: UsageRecord[];

    @ManyToOne(() => PassStation, ps => ps.passPoints)
    passStation!: PassStation
}