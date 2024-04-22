import { OCrypto } from "$lib/OCrypto";
import type { Handle } from "@sveltejs/kit";
import { prisma } from "$lib/server/prisma";
import { AppUserInfos } from "./lib/models/AppUserInfos";

// await prisma.$connect();

// {Nom de Domaine}/api/passrecord/{id station}/{id point de passage}?card=37AC490

//handle
export const handle: Handle = async function ({ event, resolve }) {

    //get cookies
    //get auth cookie
    const authCookie = event.cookies.get('Pag20_CTKN' || '');

    if (authCookie) {
        const decodedToken = OCrypto.verifyAnddecodeJwtToken(String(authCookie))
        const sessionHash = JSON.parse(decodedToken).sessionId

        if (sessionHash) {

            //find session
            const session = await prisma.appUserSession.findFirst({
                where: {
                    hash: sessionHash
                },
                include: {
                    user: {
                        select: {
                            accountActivated: true,
                            accountBalance: true,
                            phoneNumber: true
                        }
                    }
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
