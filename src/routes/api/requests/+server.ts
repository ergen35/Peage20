import type { RequestHandler } from './$types';
import { AppDataSource, User, CardRequest } from '$lib/data-sources';
import { error, json } from '@sveltejs/kit';
import { randomUUID } from 'crypto';

export const POST: RequestHandler = async ({ request }) => {
    const  { username } = await request.json();
    const usersRepos = AppDataSource.getRepository(User)
    const cardReqRepos = AppDataSource.getRepository(CardRequest)

    if(!username){
        throw error(400, "no specified username")
    }

    const user = await usersRepos.findOne({
        where: {
            phoneNumber: username
        },
        relations: {
            cardRequest: true
        }
    }) 

    if(!user){
        throw error(404, "user not found")
    }

    let requestTicket = "";

    if(user.cardRequest)
    {
        user.cardRequest.requestDate = Date.now();
        user.cardRequest.requestStatus = "pending";

        await cardReqRepos.save(user.cardRequest);
        
        requestTicket = user.cardRequest.requestTicket
    }
    else
    {
        let c_request = new CardRequest();
        c_request.requestDate = Date.now();
        c_request.requestStatus = 'pending'
        c_request.requestTicket = randomUUID().split('-')[0]
        c_request.requestMaker = user;
    
        c_request = await cardReqRepos.save(c_request);
        user.cardRequest = c_request;
        
        requestTicket = c_request.requestTicket;
    }
    
    await usersRepos.save(user);

    
    return json({
        requestTicket: requestTicket
    })
};