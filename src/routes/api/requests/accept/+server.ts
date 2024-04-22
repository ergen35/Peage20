import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/prisma';


export const POST: RequestHandler = async ({ url, request }) => {

    const requestId = url.searchParams.get("requestId");
    const { cardId } = await request.json();

    if (!requestId)
        throw error(400, "bad request, request id not provided")

    if (isNaN(Number(requestId)))
        throw error(400, "invalid request")

    //find card request
    const cardRequest = await prisma.cardRequest.findFirst({
        where: {
            id: Number(requestId)
        },
        include: {
            requestMaker: true
        }
    })

    //not found
    if (!cardRequest)
        throw error(404, 'card request not found')

    //find existing PassCard
    const pc = await prisma.passCard.findFirst({
        where: {
            cardID: cardId
        }
    });

    if (pc) throw error(400, "exists")

    //update card request status
    await prisma.cardRequest.update({
        where: {
            id: Number(requestId)
        },
        data: {
            requestStatus: 'Accepted'
        }
    });

    //then create a card for that user    
    const passCard = await prisma.passCard.create({
        data: {
            cardID: cardId,
            cardOwnerId: cardRequest.requestMakerId,
            creationDate: new Date(),
            isActivated: true
        }
    });

    //assign card to user & activate
    await prisma.user.update({
        where: {
            id: cardRequest.requestMakerId
        },
        data: {
            accountActivated: true
        }
    });

    return new Response("card accepted", { status: 200 });
};