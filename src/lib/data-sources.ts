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
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'averymkv3',
    password: 'averymkv3',
    database: 'peage20db',
    synchronize: true,
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
