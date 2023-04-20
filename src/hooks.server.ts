import { AppDataSource } from "$lib/data-sources";
import { createConnection as createMySqlConnection } from "mysql";
import type { DataSource } from "typeorm";


/**
 * Create an sql database if not exist, with default "create database" query
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
        })

        connection.end((err) => {
            if (err) {
                console.error("Unable to close initial conection")
            }
        })

        console.log("Database created");
        resolve(true)
    }) 
}


//create database if not exists
await createDatabaseIfNotExists(AppDataSource);

//introduce a 5000ms wait before working on the newly created database
console.log("Starting 5000ms wait.")
const execDelay = new Promise((resolve) => {
    setTimeout(() =>{
        console.log("5000ms wait ended.")
        resolve(0)
    }, 5000)
})

await execDelay;

//initialize datasource for the st time
if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
}

if (AppDataSource.isInitialized) {
    console.log("App Data source is initialized and ready");
}