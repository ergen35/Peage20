import { AppDataSource, CardRequest } from '$lib/data-sources';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
    const requestId = params.requestId

    const request = await AppDataSource.manager.findOne(CardRequest, {
        where: {
            id: requestId
        },
        relations: {
            requestMaker: true
        }
    });

    if(!request)
        throw redirect(302, "/admin/card-requests")

    return {
        request: structuredClone(request)
    };
}) satisfies PageServerLoad;