import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/prisma';

export const POST: RequestHandler = async ({ request }) => {
    const { price, name } = await request.json();

    if (isNaN(price))
        throw error(400, "Price is incorrect")
    if (!name)
        throw error(400, "Station name is incorrect")

    const station = await prisma.passStation.create({
        data: {
            name: name,
            price: Number(price)
        }
    });

    return json(structuredClone(station), {
        status: 201
    });
};