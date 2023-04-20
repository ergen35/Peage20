import { OCrypto } from '$lib/OCrypto';
import { AppDataSource } from '$lib/data-sources';
import { User } from '$lib/entities';
import { error } from '@sveltejs/kit';
import { serialize } from 'cookie';
import type { RequestHandler } from './$types';


export const POST: RequestHandler =  async ({ request }) => {
    const body: { username: string, password: string } = await request.json();

    //get user by phone number
    const usersRepos = AppDataSource.getRepository(User);
    const existingUser = await usersRepos.findOneBy({ phoneNumber: body.username })

    if (existingUser) {
        throw error(404, new Error('user already exists'))
        //FIXME: or return a bad request response
    }

    //generate salt & compute password hash
    const salt = OCrypto.generateSalt();
    const computedHash = OCrypto.computeHash(body.password, Buffer.from(salt));

    //register the user with the given parameters
    let user = new User();
    user.phoneNumber = body.username;
    user.extraSecret = OCrypto.convertToBase64String(salt);
    user.passwordHash = computedHash;

    user = await usersRepos.save(user);

    //create session

    //return {status, header, body } 

    return new Response(null, {
        status: 201,
        headers: {

        },
        statusText: ""
    })
}