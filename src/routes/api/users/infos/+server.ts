import { prisma } from '$lib/server/prisma';
import type { RequestHandler } from './$types';


export const POST: RequestHandler = async ({ request }) => {

    const { username, lastName, firstName, address } = await request.json();

    const requestedUser = await prisma.user.update({
        where: {
            phoneNumber: username
        },
        data: {
            firstName,
            lastName,
            address
        }
    });

    if (requestedUser) {
        return new Response('success', {
            status: 200
        });
    }

    return new Response('failed', {
        status: 400
    });
};