import { OCrypto } from "$lib/OCrypto";
import { AppDataSource, AppUserInfos, AppUserSession } from "$lib/data-sources";
import type { Handle } from "@sveltejs/kit";

// initialize datasource for the 1st time
if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
}

if (AppDataSource.isInitialized) {
    console.log("App Data source is initialized and ready");
}

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

    return resolve(event);
}