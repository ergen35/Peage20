import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';

export const load = (async ({ locals }) => {

    const full_user = await prisma.user.findFirst({
        where: {
            phoneNumber: locals.user?.username
        },
        include: {
            userCard: true,
            cardRequest: true
        }
    });


    const last15Transactions = await prisma.transactionOperation.findMany({
        where: {
            transactionActorId: full_user?.id
        },
        select: {
            id: true,
            amount: true,
            transactionId: true,
            hash: true,
            initiatedOn: true,
            status: true,
        },
        take: 15
    });

    return {
        user: structuredClone(locals.user),
        fullUser: structuredClone(full_user),
        last15Transactions: structuredClone(last15Transactions)
    };
}) satisfies PageServerLoad;