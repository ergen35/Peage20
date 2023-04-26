import 'reflect-metadata';
import { DataSource } from 'typeorm';
import {
    AppSettings,
    AppUserSession,
    CardRequest,
    PassAgent,
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
    synchronize: false,              //TODO: remove synchronize in production
    entities: [CardRequest, PassAgent, PassCard, PassPoint, PassStation, TransactionOperation, UsageRecord, User, AppUserSession, AppSettings],
    migrations: [],
    logging: true,
    subscribers: []
})