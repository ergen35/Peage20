import type { RequestHandler } from './$types';
import { error, json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export const POST: RequestHandler = async ({ request, url }) => {

    const stationId = url.searchParams.get("stationId");
    if (!stationId)
        throw error(400, "station not provided")

    const station = await prisma.passStation.findFirst({
        where: {
            id: stationId
        }
    })

    if (!station)
        throw error(404, "station not found")

    const { name, direction, geoAddress } = await request.json();

    if (!name || !direction)
        throw error(400, "incorrect data")

    const passpoint = await prisma.passPoint.create({
        data: {
            name: name,
            passDirection: direction,
            passStationId: station.id,
            geoAddress: geoAddress
        }
    })

    return json(passpoint, {
        status: 202,
    });
};