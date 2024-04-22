import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/prisma';

export const DELETE: RequestHandler = async ({ url }) => {

    const id = url.searchParams.get('ppId');
    if (!id)
        throw error(400, "passpoint id not found")

    const result = await prisma.passPoint.delete({
        where: {
            id: id
        }
    })

    if (!result)
        throw error(404, "Pass Point not found")

    return json("passpoint deleted", {
        status: 200
    });
};