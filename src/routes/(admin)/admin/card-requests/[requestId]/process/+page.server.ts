import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';

export const load = (async ({ params }) => {
    const requestId = params.requestId

    if (isNaN(Number(params.requestId)))
        throw redirect(302, "/admin/card-requests")

    const request = await prisma.cardRequest.findFirst({
        where: {
            id: Number(requestId)
        },
        include: {
            requestMaker: true
        }
    })

    if (!request)
        throw redirect(302, "/admin/card-requests")

    return {
        request: structuredClone(request)
    };
}) satisfies PageServerLoad;