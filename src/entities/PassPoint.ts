import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UsageRecord } from "./UsageRecord";
import { PassStation } from "./PassStation";


@Entity()
export class PassPoint {

    @PrimaryGeneratedColumn()
    id!: string;

    @Column('text', { default: '' })
    name!: string;

    @Column('string')
    passDirection!: string

    @Column('text', { default: '' })
    geoAddress!: string;

    @OneToMany(() => UsageRecord, u => u.passPoint)
    usageRecords!: UsageRecord[];

    @ManyToOne(() => PassStation, ps => ps.passPoints)
    passStation!: PassStation
}