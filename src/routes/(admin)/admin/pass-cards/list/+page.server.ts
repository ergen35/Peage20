import { AppDataSource } from '$lib/data-sources';
import { PassCard } from '$lib/entities';
import type { PageServerLoad } from './$types';

export const load = (async ({ parent }) => {
    const cardsRepos = AppDataSource.getRepository(PassCard);
    const allCards = await cardsRepos.find({
        relations: {
            usageRecords: true,
            cardOwner: true
        }
    });

    const { user } = await parent();


    return {
        user,
        allCards: structuredClone(allCards)
    };
}) satisfies PageServerLoad;