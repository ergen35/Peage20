import type { PageServerLoad } from './$types';
import { AppDataSource } from '$lib/data-sources';
import { PassCard, User, PassAgent, PassPoint, PassStation, UsageRecord } from '$lib/entities';

export const load = (async ({parent}) => {

    const cardsCount = await AppDataSource.manager.count(PassCard); 
    const usersCount = await AppDataSource.manager.count(User);
    const agentsCount = await AppDataSource.manager.count(PassAgent)
    const passesCount = await AppDataSource.manager.count(PassPoint)
    const stationsCount = await AppDataSource.manager.count(PassStation)
    const usagesCount = await AppDataSource.manager.count(UsageRecord)

    const { user } = await parent();
    return {
        user,
        cardsCount,
        usersCount,
        passesCount,
        stationsCount,
        usagesCount, 
        requestsCount: 13,
        agentsCount
    }
}) satisfies PageServerLoad;