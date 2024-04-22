import { prisma } from '$lib/server/prisma';
import type { RequestHandler } from './$types';
import { error } from '@sveltejs/kit';


export const POST: RequestHandler = async ({ url }) => {

    const requestId = url.searchParams.get("requestId");
    if (!requestId)
        throw error(400, "bad request, request id not provided")

    if (isNaN(Number(requestId)))
        throw error(400, "invalid request")

    //find card
    const cardRequest = await prisma.cardRequest.findFirst({
        where: {
            id: Number(requestId)
        }
    });

    if (!cardRequest) throw error(404, 'card request not found')

    //update request status -> Rejected
    await prisma.cardRequest.update({
        where: {
            id: Number(requestId)
        },
        data: {
            requestStatus: 'Rejected'
        }
    })

    return new Response("card rejected",
        {
            status: 200
        });
};
