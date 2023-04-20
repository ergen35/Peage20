import { DataSource } from 'typeorm'
import 'reflect-metadata'


export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'peage20db',
    entities: [],
    logging: true,
    subscribers: []
})