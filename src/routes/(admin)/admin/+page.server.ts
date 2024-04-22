import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load = (async ({ parent }) => {

    const cardsCount = await prisma.passCard.count()
    const usersCount = await prisma.user.count()
    const agentsCount = await prisma.passAgent.count()
    const passesCount = await prisma.passPoint.count()
    const stationsCount = await prisma.passStation.count()
    const usagesCount = await prisma.usageRecord.count()
    const requestsCount = await prisma.cardRequest.count({
        where: {
            requestStatus: 'Pending'
        }
    })

    const { user } = await parent();
    return {
        user,
        cardsCount,
        usersCount,
        passesCount,
        stationsCount,
        usagesCount,
        requestsCount,
        agentsCount
    }
}) satisfies PageServerLoad;