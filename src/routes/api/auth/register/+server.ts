import { OCrypto } from '$lib/OCrypto';
import { error } from '@sveltejs/kit';
import { genSaltSync, hashSync } from "bcrypt";
import { serialize } from 'cookie';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/prisma';


export const POST: RequestHandler = async ({ request }) => {
    const body: { username: string, password: string } = await request.json()

    //get user by phone number
    const existingUser = await prisma.user.findUnique({
        where: {
            phoneNumber: body.username
        }
    })

    if (existingUser) {
        throw error(400, new Error('user already exists'))
    }

    //generate salt & compute password hash
    const salt = genSaltSync(10);
    const computedHash = hashSync(body.password, salt);

    //register the user with the given parameters
    const user = await prisma.user.create({
        data: {
            phoneNumber: body.username,
            extraSecret: salt,
            passwordHash: computedHash,
            registrationDate: new Date(),
            firstName: "",
            lastName: "",
        }
    })

    //create session
    const session = await prisma.appUserSession.create({
        data: {
            userId: user.id,
            hash: OCrypto.convertToBase64String(Buffer.from(user.phoneNumber)),
        }
    })

    //return headers with auth in
    return new Response("successful registration!", {
        status: 201,
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
}