import { prisma } from '$lib/server/prisma';
import type { RequestHandler } from './$types';
import { error, json } from '@sveltejs/kit';
import { randomUUID } from 'crypto';

export const POST: RequestHandler = async ({ request }) => {
    const { username } = await request.json();

    if (!username) {
        throw error(400, "no specified username")
    }

    //find user and load his card request
    const user = await prisma.user.findFirst({
        where: {
            phoneNumber: username
        },
        include: {
            cardRequest: {
                select: {
                    requestDate: true,
                    requestStatus: true,
                    requestTicket: true
                }
            }
        }
    })

    //user not found
    if (!user) {
        throw error(404, "user not found")
    }

    //requestTicket will be returned
    let requestTicket = "";


    //if a previous card request was made, just update it status & date
    if (user.cardRequest) {
        requestTicket = user.cardRequest.requestTicket

        await prisma.cardRequest.update({
            where: {
                requestMakerId: user.id
            },
            data: {
                requestDate: new Date(),
                requestStatus: 'Pending'
            }
        });
    }
    else {
        //create issue a new card request
        const cardRequest = await prisma.cardRequest.create({
            data: {

                requestDate: new Date(),
                requestStatus: 'Pending',
                requestTicket: randomUUID().split('-')[0],
                requestMakerId: user.id
            }
        })

        requestTicket = cardRequest.requestTicket;
    }

    //return request ticket
    return json({
        requestTicket: requestTicket
    })
};