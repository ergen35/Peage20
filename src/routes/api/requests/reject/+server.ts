import type { RequestHandler } from './$types';
import { error } from '@sveltejs/kit';

import { AppDataSource, CardRequest } from '$lib/data-sources'; 

export const POST: RequestHandler = async ({ url }) => {
    
    const requestId = url.searchParams.get("requestId");
    if(!requestId)
        throw error(400, "bad request, request id not provided")
    
    if(isNaN(Number(requestId)))
        throw error(400, "invalid request")

    //find card
    const cardRequest = await AppDataSource.manager.findOneBy(CardRequest, { id: Number(requestId) });
    if(!cardRequest)
        throw error(404, 'card request not found')

    cardRequest.requestStatus = 'rejected';
    await AppDataSource.manager.save(cardRequest);

    return new Response("card rejected",
    {
        status: 200
    });
};