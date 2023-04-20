import { createConnection as createMySqlConnection } from "mysql";
import type { DataSource } from "typeorm";
import { AppDataSource } from "./data/data-sources";


function createDatabaseIfNotExists(dataSource: DataSource) {

    return new Promise<boolean>((resolve, reject) => {
        const connection = createMySqlConnection({
            host: 'localhost',
            user: 'root',
            password: ''
        })

        connection.connect((err) => {
            if (err) {
                throw err
            }
        })

        connection.query("CREATE DATABASE IF NOT EXISTS " + dataSource.options.database + ";", (err2, __) => {
            if (err2) throw err2;
            else console.log("Database created");
        })

        connection.end((err) => {
            if(err){
                console.error("Unable to close initial conection")
            }
        })

        resolve(true)
    })
}



//create database if not exists
await createDatabaseIfNotExists(AppDataSource);
//initializr datasource for the st time
if(!AppDataSource.isInitialized)
{
    await AppDataSource.initialize();
}

if (AppDataSource.isInitialized) {
    AppDataSource.logger.log('info', "App Data source is initialized and ready");
}