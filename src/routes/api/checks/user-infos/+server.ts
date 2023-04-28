import { AppDataSource, User } from '$lib/data-sources';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
    
    const { username } = await request.json();
    
    if(!username) throw error(400, 'username')

    const usersRepos = AppDataSource.getRepository(User);

    const requestedUser = await usersRepos.findOneBy({
        phoneNumber: username
    });

    if(!requestedUser) throw error(404, 'user not found')

    let resp = false
    
    if(requestedUser.address && requestedUser.firstName && requestedUser.lastName)
    {
        resp = true
    }
            
    return json({ isUserOk: resp }, {
        status: 200
    })
};