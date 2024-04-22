import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/prisma';


export const DELETE: RequestHandler = async ({ url }) => {

    const userIdStr = url.searchParams.get("id");
    if (!userIdStr)
        throw error(400, "user id not included")

    const userIdNum = Number(userIdStr);
    if (Number.isNaN(userIdNum))
        throw error(400, "invalid id")

    //delete user from database
    const userToDelete = await prisma.user.delete({
        where: {
            id: userIdNum
        },
    })

    if (!userToDelete) throw error(404, "user not found")

    return new Response("user deteled", {
        status: 200
    })
};