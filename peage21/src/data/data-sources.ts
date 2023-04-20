import { DataSource } from 'typeorm'
import 'reflect-metadata'
import {
    PassCard,
    PassPoint,
    TransactionOperation,
    UsageRecord,
    User
} from '../entities/entities';


export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'peage20db',
    synchronize: true, //TODO: remove synchronize in production
    entities: [PassCard, PassPoint, TransactionOperation, UsageRecord, User],
    migrations: [],
    logging: true,
    subscribers: []
})