import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';

export const load = (async ({ locals }) => {
    const full_user = await prisma.user.findFirst({
        where: {
            phoneNumber: locals.user?.username
        }
    });
   
    return {
        user: structuredClone(full_user)
    };
}) satisfies PageServerLoad;