import type { PageServerLoad } from './$types';
import  { AppDataSource, User, TransactionOperation } from '$lib/data-sources';

export const load = (async ({ locals }) => {

    const full_user = await AppDataSource.manager.findOne(User, {
        where: {
            phoneNumber: locals.user!.username
        },
        relations: {
            userCard: true,
            cardRequest: true,
        }
    })

    const last15Transactions = await AppDataSource.manager.find(TransactionOperation, {
        where: {
            transactionActor: full_user!
        },
        loadRelationIds: true,
        take: 15
    });

    return {
        user: structuredClone(locals.user),
        fullUser: structuredClone(full_user),
        last15Transactions: structuredClone(last15Transactions)
    };
}) satisfies PageServerLoad;