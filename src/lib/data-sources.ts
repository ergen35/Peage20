import 'reflect-metadata';
import { AppSettings } from '../entities/AppSettings';
import { AppUserInfos } from "../entities/AppUserInfos";
import { AppUserSession } from '../entities/AppUserSession';
import { CardRequest } from '../entities/CardRequest';
import { PassAgent } from "../entities/PassAgent";
import { PassCard } from "../entities/PassCard";
import { PassPoint } from "../entities/PassPoint";
import { PassStation } from '../entities/PassStation';
import { TransactionOperation } from "../entities/TransactionOperation";
import { UsageRecord } from "../entities/UsageRecord";
import { User } from "../entities/User";

import { DataSource } from 'typeorm';


const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'peage20db',
    synchronize: true,              //TODO: remove synchronize in production
    dropSchema: false,
    entities: [CardRequest, PassAgent, PassCard, PassPoint, PassStation, TransactionOperation, UsageRecord, User, AppUserSession, AppSettings],
    migrations: [],
    logging: false,
    subscribers: []
})

export {
    AppDataSource,
    AppSettings, AppUserInfos, AppUserSession,
    CardRequest,
    PassAgent,
    PassCard,
    PassPoint,
    PassStation,
    TransactionOperation, UsageRecord,
    User
};
