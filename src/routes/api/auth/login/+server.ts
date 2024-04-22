import { OCrypto } from '$lib/OCrypto';
import { error } from '@sveltejs/kit';
import { compareSync } from "bcrypt";
import { serialize } from 'cookie';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/prisma';

export const POST: RequestHandler = async function ({ request }) {

    const body = await request.json()

    //get user by phone number
    const user = await prisma.user.findUnique({
        where: {
            phoneNumber: body.username
        },
        include: {
            session: {
                select: {
                    id: true
                }
            }
        },
    })

    if (!user) {
        throw error(404, new Error('user is not registered'))
    }

    //compute password hash with salt from user object
    const compareResult = compareSync(body.password, user.passwordHash)

    if (!compareResult)
        throw error(400, "incorrect password");

    //delete older session
    if (user.session) {
        await prisma.appUserSession.delete({ where: { id: user.session.id } })
    }

    //create session
    const session = await prisma.appUserSession.create({
        data: {
            hash: OCrypto.convertToBase64String(Buffer.from(user.phoneNumber)),
            userId: user.id,
        }
    })

    //return headers with auth in
    return new Response("successful registration!", {
        status: 200,
        headers: {
            'Set-Cookie': serialize('Pag20_CTKN', OCrypto.tokenizeObject({ sessionId: session.hash }), {
                path: '/',
                httpOnly: true,
                sameSite: 'strict',
                maxAge: 60 * 60 * 24, // one day
            }),
        },
        statusText: "success",
    })
};