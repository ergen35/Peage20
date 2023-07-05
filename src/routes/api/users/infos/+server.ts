import type { RequestHandler } from './$types';
import { AppDataSource, User } from '$lib/data-sources';

export const POST: RequestHandler = async ({ request }) => {

    const { username, lastName, firstName, address } = await request.json();
    const usersRepos = AppDataSource.getRepository(User);

    const requestedUser = await usersRepos.findOneBy({
        phoneNumber: username
    });

    if (requestedUser) {
        requestedUser.firstName = firstName;
        requestedUser.lastName = lastName;
        requestedUser.address = address

        await usersRepos.save(requestedUser);
        return new Response('success', {
            status: 200
        });
    }

    return new Response('failed', {
        status: 400
    });
};