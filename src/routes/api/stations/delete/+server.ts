import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/prisma';

export const DELETE: RequestHandler = async ({ url }) => {

    const stationId = url.searchParams.get("stationId");

    if (!stationId)
        throw error(400, "station Id not provided")

    const station = await prisma.passStation.findFirst({
        where: {
            id: stationId
        },
        include: {
            passPoints: true
        }
    })

    if (!station) throw error(404, "station not found")

    await prisma.passStation.delete({
        where: {
            id: stationId
        }
    });

    return json("done", {
        status: 200
    });
};