import type { PageServerLoad } from './$types';
import { AppDataSource } from '$lib/data-sources';
import { User, } from '$lib/entities';


export const load = (async ({ parent }) => {
    
    const usersRepos = AppDataSource.getRepository(User);
    const allUsers = await usersRepos.find({
        relations: {
            cardRequest: true,
            userCard: true,
        }
    })
    const { user } = await parent();
    
    return {
        user, 
        allUsers: structuredClone(allUsers)
    };
}) satisfies PageServerLoad;