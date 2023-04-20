import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UsageRecord } from "./UsageRecord";


@Entity()
export class PassPoint{
    
    @PrimaryGeneratedColumn()
    id!: string;

    @Column('text')
    name!: string;

    @Column('text')
    geoAddress!: string;

    @OneToMany(() => UsageRecord, u => u.passPoint)
    usageRecords!: UsageRecord[];
}