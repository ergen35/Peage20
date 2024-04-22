import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load = (async ({ parent }) => {

    const allCards = await prisma.passCard.findMany({
        include: {
            usageRecords: true,
            cardOwner: true
        }
    })

    const { user } = await parent();

    return {
        user,
        allCards: structuredClone(allCards)
    };
}) satisfies PageServerLoad;