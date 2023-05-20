import { OCrypto } from '$lib/OCrypto';
import { AppDataSource, AppUserSession, User } from '$lib/data-sources';
import { error } from '@sveltejs/kit';
import { serialize } from 'cookie';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async function({ request }) {
 
    const body = await request.json()

    //get user by phone number
    const usersRepos = AppDataSource.getRepository(User)
    const user = await usersRepos.findOne({ 
        where: { 
            phoneNumber: body.username 
        },
        relations: {
            session: true
        }
    })

    if (!user) {
        throw error(404, new Error('user is not registered'))
    }

    //TODO: compute password hash with salt from user object
    const salt = OCrypto.convertFromBase64ToAscii(user.extraSecret);
    const computedHash = OCrypto.computeHash(body.password, Buffer.from(salt))

    //compare password hashes
    // console.log("existing hash: " +  user.passwordHash)   
    // console.log("calculated hash: " +  computedHash)   

    const compareResult = OCrypto.verifyPassword(body.password, user.passwordHash, salt);
    console.log("Password comparison result: " + compareResult)
    
    if(!(user.passwordHash == computedHash))
    {
        throw error(400, "incorrect password");
    }

    //create session
    const sessionsRepos = AppDataSource.getRepository(AppUserSession)
    if(user.session)
    {
        await sessionsRepos.remove(user.session)
    }

    let session = new AppUserSession()
    session.user = user
    session.hash = OCrypto.convertToBase64String(Buffer.from(user.phoneNumber))

    session = await sessionsRepos.save(session);
    
    //link user & session
    user.session = session;
    await usersRepos.save(user);

    //return headers with auth in
    return new Response("successful registration!", {
        status: 200,
        headers: {
            'Set-Cookie': serialize('Pag20_CTKN', OCrypto.tokenizeObject({ sessionId: session.hash }), {
                path: '/',
                httpOnly: true,
                sameSite: 'strict',
                maxAge: 60 * 60 * 24, // one day
            }),
        },
        statusText: "success",
    })
};