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
import { TransactionStatus } from "../entities/TransactionStatus";
import { UsageRecord } from "../entities/UsageRecord";
import { User } from "../entities/User";
import { createConnection as createMySqlConnection } from 'mysql';

import { DataSource } from 'typeorm';


const AppDataSource = new DataSource({
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

//Create & Init database if not exists  
function createDatabaseIfNotExists(dataSource: DataSource) {
    const connection = createMySqlConnection({
        host: 'localhost',
        user: 'root',
        password: ''
    })

    connection.connect((err) => {
        if (err) throw err;
    })

    connection.query("CREATE DATABASE IF NOT EXISTS " + dataSource.options.database + ";", (err2) => {
        if (err2) throw err2;
        else console.log("Database created");
    })
}

//create if not exist
createDatabaseIfNotExists(AppDataSource);

AppDataSource.initialize().then(() => console.log('Database initialized'));

export {
    AppDataSource,
    AppSettings, AppUserInfos, AppUserSession,
    CardRequest,
    PassAgent,
    PassCard,
    PassPoint,
    PassStation,
    TransactionOperation, TransactionStatus, UsageRecord,
    User
};
