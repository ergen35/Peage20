import type { PageServerLoad } from './$types';
import { AppDataSource, PassStation, PassPoint } from '$lib/data-sources';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ params, locals }) => {
    const stationId = params.stationId;

    const station = await AppDataSource.manager.findOne(PassStation, {
        where: {
            id: stationId
        }
    });

    if(!station)
        throw redirect(302, "/admin/pass-stations");
    
    const passPoints = await AppDataSource.manager.findBy(PassPoint, {
        passStation: station
    });
    
    return {
        user: structuredClone(locals.user),
        station: structuredClone(station),
        passPoints: structuredClone(passPoints)
    }
}) satisfies PageServerLoad;