import 'reflect-metadata';
import { DataSource } from 'typeorm';
import {
    PassCard,
    PassPoint,
    TransactionOperation,
    UsageRecord,
    User,
    AppUserSession
} from './entities';


export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'peage20db',
    synchronize: true,              //TODO: remove synchronize in production
    entities: [PassCard, PassPoint, TransactionOperation, UsageRecord, User, AppUserSession],
    migrations: [],
    logging: true,
    subscribers: []
})