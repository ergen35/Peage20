import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';


export const load = (async () => {

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