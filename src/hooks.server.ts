import { OCrypto } from "$lib/OCrypto";
import { AppDataSource, AppUserInfos, AppUserSession } from "$lib/data-sources";
import type { Handle } from "@sveltejs/kit";


/**
 * Create an sql database if not exist, with default "create database" query
 */
// function createDatabaseIfNotExists(dataSource: DataSource) {

//     return new Promise<boolean>((resolve) => {
//         const connection = createMySqlConnection({
//             host: 'localhost',
//             user: 'root',
//             password: ''
//         })

//         connection.connect((err) => {
//             if (err) {
//                 throw err
//             }
//         })

//         connection.query("CREATE DATABASE IF NOT EXISTS " + dataSource.options.database + ";", (err2) => {
//             if (err2) throw err2;
//         })

//         connection.end((err) => {
//             if (err) {
//                 console.error("Unable to close initial conection")
//             }
//         })

//         console.log("Database created");
//         resolve(true)
//     })
// }


//create database if not exists
// await createDatabaseIfNotExists(AppDataSource);

// //introduce a 5000ms wait before working on the newly created database
// console.log("Starting 5000ms wait.")
// const execDelay = new Promise((resolve) => {
//     setTimeout(() => {
//         console.log("5000ms wait ended.")
//         resolve(0)
//     }, 5000)
// })

// await execDelay;

//initialize datasource for the st time
// if (!AppDataSource.isInitialized) {
//     await AppDataSource.initialize();
// }

// if (AppDataSource.isInitialized) {
//     console.log("App Data source is initialized and ready");
// }

// {Nom de Domaine}/api/passrecord/{id station}/{id point de passage}?card=37AC490

//Request handlers

//handle
export const handle: Handle = async function ({ event, resolve }) {

    //get cookies
    //get auth cookie
    const authCookie = event.cookies.get('Pag20_CTKN' || '');

    if (authCookie) {
        const decodedToken = OCrypto.verifyAnddecodeJwtToken(String(authCookie))
        const sessionHash = JSON.parse(decodedToken).sessionId

        if (sessionHash) {
            const sessionRepos = AppDataSource.getRepository(AppUserSession);
            //find session
            const session = await sessionRepos.findOne({
                relations: {
                    user: true
                },
                where: {
                    hash: sessionHash
                }
            });

            if (session) {
                //TODO: add some more cookies for accessibility
                // event.cookies.set('', '')

                const userInfos = new AppUserInfos();
                userInfos.accountActivated = session.user.accountActivated;
                userInfos.accountBalance = session.user.accountBalance;
                userInfos.username = session.user.phoneNumber;

                event.locals.user = userInfos;
            }
        }
    }
    else {
        event.locals.user = null;
    }

    console.log("Done beforehand")

    return resolve(event);
}