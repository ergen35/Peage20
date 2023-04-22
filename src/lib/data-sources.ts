import 'reflect-metadata';
import { DataSource } from 'typeorm';
import {
    AppSettings,
    AppUserSession,
    PassCard,
    PassPoint,
    PassStation,
    TransactionOperation,
    UsageRecord,
    User
} from './entities';


export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'peage20db',
    synchronize: true,              //TODO: remove synchronize in production
    entities: [PassCard, PassPoint, PassStation, TransactionOperation, UsageRecord, User, AppUserSession, AppSettings],
    migrations: [],
    logging: true,
    subscribers: []
})