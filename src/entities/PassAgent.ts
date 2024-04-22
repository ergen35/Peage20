import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";


@Entity()
export class PassAgent{

    @PrimaryGeneratedColumn()
    id!: number

    @Column('varchar', { default: '' })
    name!: string

    @Column('boolean')
    isAdmin = false;

    @Column('timestamp')
    lastAccessDate!: Date

    @Column('text')
    passwordHash!: string

    @Column('varchar', { default: '' })
    username!: string

    @Column('varchar', { default: '' })
    phoneNumber!: string

    @Column('varchar')
    registeredBy!: string
}