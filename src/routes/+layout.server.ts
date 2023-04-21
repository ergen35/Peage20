import { AppDataSource } from '$lib/data-sources';
import { User } from '$lib/entities';
import type { LayoutServerLoad } from './app/$types';

export const load: LayoutServerLoad = (async ({ locals }) => {

    if(locals.user)
    {
        const usersRepos = AppDataSource.getRepository(User);
        const appuser = await usersRepos.findOne({
            where: {
                phoneNumber: locals.user.username
            }
        })
    }
    return {
        user: locals.user,
        // userBalance: appuser
    };
}) satisfies LayoutServerLoad;