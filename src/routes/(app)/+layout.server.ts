import type { LayoutServerLoad } from './$types';
import { AppDataSource, User } from "$lib/data-sources"; 

export const load = (async ({ locals }) => {

    if(!locals.user){
        //TODO: redirect to login
    }

    const appUser = AppDataSource.manager.findOneBy(User, { phoneNumber: locals.user!.username });

    return {
        user: structuredClone(locals.user)
    };

}) satisfies LayoutServerLoad;