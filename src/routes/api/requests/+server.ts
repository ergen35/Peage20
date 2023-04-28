import type { RequestHandler } from './$types';
import { AppDataSource, User, CardRequest } from '$lib/data-sources';
import { error, json } from '@sveltejs/kit';


export const POST: RequestHandler = async ({ request }) => {
    const  { username } = await request.json();
    const usersRepos = AppDataSource.getRepository(User)
    const cardReqRepos = AppDataSource.getRepository(CardRequest)

    if(!username){
        throw error(400, "no specified username")
    }

    const user = await usersRepos.findOneBy({
        phoneNumber: username
    }) 

    if(!user){
        throw error(404, "user not found")
    }

    let c_request = new CardRequest();
    c_request.requestDate = Date.now();
    c_request.requestMaker = user;
    c_request.requestStatus = 'pending'
    c_request.requestTicket = Math.random().toString(); //TODO: generate a truncated UUID fro ticket

    c_request = await cardReqRepos.save(c_request);

    user.cardRequest = c_request;
    await usersRepos.save(user);

    
    return json({
        requestTicket: c_request.requestTicket
    })
};