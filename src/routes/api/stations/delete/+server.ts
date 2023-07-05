import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { AppDataSource, PassStation } from '$lib/data-sources';

export const DELETE: RequestHandler = async ({ url }) => {
    
    const stationId = url.searchParams.get("stationId");

    if(!stationId)
        throw error(400, "station Id not provided")
    
    const station = await AppDataSource.manager.findOne(PassStation, {
        where: {
            id: stationId
        },
        relations: {
            passPoints: true
        }
    });

    if(!station)
        throw error(404, "station not found")
    
    await AppDataSource.manager.remove(station)
    if(station.passPoints)
        await AppDataSource.manager.remove(station.passPoints)
    
    return json("done", {
        status: 200
    });
};