import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';


export const load = (async ({ parent }) => {

    const allUsers = await prisma.user.findMany({
        include: {
            cardRequest: true,
            userCard: true
        }
    })

    const { user } = await parent();

    return {
        user,
        allUsers: structuredClone(allUsers)
    };
}) satisfies PageServerLoad;