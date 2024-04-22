import { prisma } from '$lib/server/prisma';
import { AppUserInfos } from '../../lib/models/AppUserInfos';
import type { LayoutServerLoad } from './$types';

export const load = (async () => {
    //TODO: get real data
    const appu = new AppUserInfos()
    appu.userType = 'super-admin'

    const count = await prisma.cardRequest.count({
        where: {
            requestStatus: "Pending"
        }
    })

    return {
        user: structuredClone(appu),
        reqCount: count
    };
}) satisfies LayoutServerLoad;