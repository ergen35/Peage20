import type { PageServerLoad } from './$types';
import { AppDataSource, User } from '$lib/data-sources';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ locals }) => {
    
    const user = locals.user;

    const user_data = await AppDataSource.manager.findOneBy(User, {
        phoneNumber: user == null ? "" : user!.username,
    });

    if(user_data == null){
        throw redirect(302, '/')
    }

    const userData = {
        firstName: user_data?.firstName,
        lastName: user_data.lastName,
        phoneNumber: user_data.phoneNumber,
        address: user_data.address,
        username: user?.username,
    };

    return {
        user: structuredClone(user),
        userData
    };
}) satisfies PageServerLoad;
