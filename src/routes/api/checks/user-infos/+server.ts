import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/prisma';

export const POST: RequestHandler = async ({ request }) => {

    const { username } = await request.json();

    if (!username) throw error(400, 'username')

    const requestedUser = await prisma.user.findFirst({
        where: {
            phoneNumber: username
        },
        select: {
            address: true,
            firstName: true,
            lastName: true
        }
    })

    if (!requestedUser) throw error(404, 'user not found')

    let resp = false

    if (requestedUser.address && requestedUser.firstName && requestedUser.lastName) {
        resp = true
    }

    return json({ isUserOk: resp }, {
        status: 200
    })
};