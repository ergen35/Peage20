import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    fisrtName: string

    @Column()
    lastName: string

    @Column('float64')
    accountBalance: number

    @Column('date')
    registrationDate: Date

    @Column({ length: 1024 })
    address: string

    @Column()
    accountActivated: boolean = false

    @Column('date')
    lastAccessDate: Date

    //relations
    @OneToMany()
    passCards:
}