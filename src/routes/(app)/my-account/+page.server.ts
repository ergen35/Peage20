import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export const load = (async ({ locals }) => {

    const user = locals.user;

    const user_data = await prisma.user.findFirst({
        where: {
            phoneNumber: user == null ? "" : user!.username,
        },
        select: {
            firstName: true,
            lastName: true,
            phoneNumber: true,
            address: true,
        }
    })

    if (user_data == null) {
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
