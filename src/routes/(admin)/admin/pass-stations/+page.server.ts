import type { PageServerLoad } from './$types';
import { AppDataSource, PassStation } from '$lib/data-sources';

export const load = (async () => {

    //get all stations
    const stations = await AppDataSource.manager.find(PassStation, {
        relations: {
            passPoints: true
        }
    });

    return {
        stations: structuredClone(stations)
    };
}) satisfies PageServerLoad;