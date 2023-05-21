import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

import { AppDataSource, CardRequest, PassCard } from '$lib/data-sources';

export const POST: RequestHandler = async ({ url, request }) => {

    const requestId = url.searchParams.get("requestId");
    const { cardId } = await request.json(); 

    if(!requestId)
        throw error(400, "bad request, request id not provided")
        
    if(isNaN(Number(requestId)))
        throw error(400, "invalid request")

    //find card request
    const cardRequest = await AppDataSource.manager.findOne(CardRequest, {
        where: { 
            id: Number(requestId) 
        },
        relations: {
            requestMaker: true
        }    
    });

    if(!cardRequest)
        throw error(404, 'card request not found')

    //find existing PassCard
    const pc = await AppDataSource.manager.exists(PassCard, {
        where: {
            cardID: cardId
        }
    });

    if(pc) 
        throw error(400, "exists")

    cardRequest.requestStatus = 'accepted';
    await AppDataSource.manager.save(cardRequest);

    //then create a card for that user
    let passCard = new PassCard();
    passCard.cardID = cardId;
    passCard.cardOwner = cardRequest.requestMaker;
    passCard.creationDate = Date.now();
    passCard.isActivated = true;
    
    passCard = await AppDataSource.manager.save(passCard);

    //assign card to user & activate
    cardRequest.requestMaker.userCard = passCard;
    cardRequest.requestMaker.accountActivated = true;
    await AppDataSource.manager.save(cardRequest.requestMaker)

    return new Response("card accepted",
    {
        status: 200
    });
};