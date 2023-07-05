import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AppSettings{

    @PrimaryGeneratedColumn()
    id!: number
}