import 'reflect-metadata'

import { Column, Entity, OneToMany, PrimaryGeneratedColumn }  from 'typeorm';
import { PassPoint } from './PassPoint';


@Entity()
export class PassStation{

    @PrimaryGeneratedColumn("uuid")
    id!: string

    @Column('text', { default: '' })
    name?: string

    @Column('double', { default: 0.0 })
    price!: number

    @OneToMany(() => PassPoint, pp => pp.passStation)
    passPoints?: PassPoint[]
}