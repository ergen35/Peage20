import { AppDataSource, CardRequest } from '$lib/data-sources';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
    const requestId = params.requestId
    
    if(isNaN(Number(params.requestId)))
        throw redirect(302, "/admin/card-requests")

    const request = await AppDataSource.manager.findOne(CardRequest, {
        where: {
            id: Number(requestId)
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