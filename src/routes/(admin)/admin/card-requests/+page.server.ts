import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';


export const load = (async ({ locals }) => {

    const requests = await prisma.cardRequest.findMany({
        where: {
            requestStatus: 'Pending'
        },
        include: {
            requestMaker: true
        }
    })

    return {
        user: structuredClone(locals.user),
        requests: structuredClone(requests)
    };

}) satisfies PageServerLoad;