import { AppDataSource, User } from '$lib/data-sources';
import type { PageServerLoad } from './$types';


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