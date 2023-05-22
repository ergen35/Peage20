import type { RequestHandler } from './$types';
import { AppDataSource, PassStation, PassPoint } from '$lib/data-sources';
import { error, json } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, url }) => {

    const stationId = url.searchParams.get("stationId");
    if(!stationId)
        throw error(400, "station not provided")
    
    const station = await AppDataSource.manager.findOneBy(PassStation, {
        id: stationId
    });

    if(!station)
        throw error(404, "station not found")

    const { name, direction, geoAddress } = await request.json();

    if(!name || !direction)
        throw error(400, "incorrect data")
    
    let pp = new PassPoint();
    pp.name = name;
    pp.geoAddress = geoAddress;
    pp.passDirection = direction;
    pp.passStation = station;
    
    pp = await AppDataSource.manager.save(pp); 

    return json(pp, {
        status: 202,
    });    
};