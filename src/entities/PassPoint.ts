import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UsageRecord } from "./UsageRecord";


@Entity()
export class PassPoint {

    @PrimaryGeneratedColumn()
    id!: string;

    @Column('text', { default: '' })
    name!: string;

    @Column('text', { default: '' })
    geoAddress!: string;

    @OneToMany(() => UsageRecord, u => u.passPoint)
    usageRecords!: UsageRecord[];
}