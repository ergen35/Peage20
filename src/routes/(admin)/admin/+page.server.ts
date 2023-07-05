import { AppDataSource, CardRequest, PassAgent, PassCard, PassPoint, PassStation, UsageRecord, User } from '$lib/data-sources';
import type { PageServerLoad } from './$types';

export const load = (async ({parent}) => {

    const cardsCount = await AppDataSource.manager.count(PassCard); 
    const usersCount = await AppDataSource.manager.count(User);
    const agentsCount = await AppDataSource.manager.count(PassAgent);
    const passesCount = await AppDataSource.manager.count(PassPoint);
    const stationsCount = await AppDataSource.manager.count(PassStation);
    const usagesCount = await AppDataSource.manager.count(UsageRecord);
    const requestsCount = await AppDataSource.manager.count(CardRequest, {
        where: {
            requestStatus: "pending"
        }
    });

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