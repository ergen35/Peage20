import type { PageServerLoad } from './$types';
import { AppDataSource, User } from '$lib/data-sources';

export const load = (async ({ locals }) => {
    const full_user = await AppDataSource.manager.findOne(User, {
        where: {
            phoneNumber: locals.user!.username
        },
        relations: {
            userCard: true,
            cardRequest: true,
        }
    })
    return {
        user: structuredClone(full_user)
    };
}) satisfies PageServerLoad;