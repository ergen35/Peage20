import { AppDataSource, PassStation } from '$lib/data-sources';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
    const { price, name } = await request.json();

    if(isNaN(price))
        throw error(400, "Price is incorrect")
    if(!name)
        throw error(400, "Station name is incorrect")

    let station = new PassStation();
    station.name = name;
    station.price = price;

    station = await AppDataSource.manager.save(station);

    return json(structuredClone(station), { 
        status: 201
    });
};