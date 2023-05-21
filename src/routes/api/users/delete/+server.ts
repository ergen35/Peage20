import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { AppDataSource, User } from '$lib/data-sources';

export const DELETE: RequestHandler = async ({ url }) => {

    const userIdStr = url.searchParams.get("id");
    if(!userIdStr)
        throw error(400, "user id not included")

    const userIdNum = Number(userIdStr);
    if(Number.isNaN(userIdNum))
        throw error(400, "invalid id")

    //find user in database
    const usersRepos = AppDataSource.getRepository(User);

    const userToDelete = await usersRepos.findOne({
        where: {
            id: userIdNum
        },
        relations: {
            cardRequest: true,
            session: true,
            userCard: true,
            userTransactions: true
        }
    })

    if(!userToDelete)
        throw error(404, "user not found")
    
    if(userToDelete.cardRequest)
        await AppDataSource.manager.remove(userToDelete.cardRequest);
    if(userToDelete.session)
        await AppDataSource.manager.remove(userToDelete.session);
    if(userToDelete.userCard)
        await AppDataSource.manager.remove(userToDelete.userCard);
    if(userToDelete.userTransactions)
        await AppDataSource.manager.remove(userToDelete.userTransactions);

    //finally remove user
    await AppDataSource.manager.remove(userToDelete);

    return new Response("user deteled", {
        status: 200
    })
};