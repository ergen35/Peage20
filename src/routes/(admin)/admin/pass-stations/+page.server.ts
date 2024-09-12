import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';


export const load = (async ({ depends }) => {

    depends('stations:list')
    //get all stations
    const stations = await prisma.passStation.findMany({
        include: {
            passPoints: true
        }
    });

    return {
        stations: structuredClone(stations)
    };
}) satisfies PageServerLoad;