import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ params, locals }) => {
    const stationId = params.stationId;

    const station = await prisma.passStation.findFirst({
        where: {
            id: stationId
        }
    })

    if (!station) throw redirect(302, "/admin/pass-stations");

    const passPoints = await prisma.passPoint.findFirst({
        where: {
            passStationId: station.id
        }
    })

    return {
        user: structuredClone(locals.user),
        station: structuredClone(station),
        passPoints: structuredClone(passPoints)
    }
}) satisfies PageServerLoad;