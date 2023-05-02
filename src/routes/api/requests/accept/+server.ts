import type { RequestHandler } from './$types';
import { error } from '@sveltejs/kit';

import { AppDataSource, CardRequest } from '$lib/data-sources'; 

export const POST: RequestHandler = async ({  url }) => {
    const cardId = url.searchParams.get("cardId");

    if(!cardId){
        throw error(400, "bad request, card id not provided")
    } 

    //find card

    const requestedCard = await AppDataSource.manager.findOneBy(CardRequest, { id: cardId });

    if(!requestedCard){
        throw error(404, 'card request not found')
    }

    requestedCard.requestStatus = 'accepted';
    await AppDataSource.manager.save(requestedCard);

    return new Response("card accepted",
    {
        status: 200
    });
};