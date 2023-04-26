import type { RequestHandler } from './$types';
import  { AppDataSource } from '$lib/data-sources';
import { User } from '$lib/entities';
import { error, json } from '@sveltejs/kit'; 

export const GET: RequestHandler = async ({ request }) => {
    const { username } = await request.json();
    
    if(!username) throw error(400, 'username')

    const usersRepos = AppDataSource.getRepository(User);

    const requestedUser = await usersRepos.findOneBy({
        phoneNumber: username
    });

    if(!requestedUser) throw error(404, 'user not found')

    const resp = requestedUser.address && requestedUser.firstName && requestedUser.lastName;
    console.log("api response is " + resp)
    return json({ isUserOk: resp }, {
        status: 200
    })
};