import { AppDataSource, CardRequest } from '$lib/data-sources';
import type { PageServerLoad } from './$types';


export const load = (async ({ locals }) => {
    
    const requests = await AppDataSource.manager.find(CardRequest, {
        relations: {
            requestMaker: true
        },
        where: {
            requestStatus: "pending"
        }
    });
    
    return {
        user: structuredClone(locals.user),
        requests: structuredClone(requests)
    };

}) satisfies PageServerLoad;