import { AppDataSource } from "$lib/data-sources";
import { createConnection as createMySqlConnection } from "mysql";
import type { DataSource } from "typeorm";


/**
 * Create an sql database if not exist, with default "create database" query
 * @param dataSource 
 * @returns Promise<bool>
 */
function createDatabaseIfNotExists(dataSource: DataSource) {

    return new Promise<boolean>((resolve) => {
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

        connection.query("CREATE DATABASE IF NOT EXISTS " + dataSource.options.database + ";", (err2) => {
            if (err2) throw err2;
            else console.log("Database created");
        })

        connection.end((err) => {
            if (err) {
                console.error("Unable to close initial conection")
            }
        })

        resolve(true)
    })
}


//create database if not exists
await createDatabaseIfNotExists(AppDataSource);

//initialize datasource for the st time
if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
}

if (AppDataSource.isInitialized) {
    console.log("App Data source is initialized and ready");
}