import { AppDataSource, PassPoint } from '$lib/data-sources';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const DELETE: RequestHandler = async ({ url }) => {

    const ppId = url.searchParams.get('ppId');
    if(!ppId)
        throw error(400, "passpoint id not found")

    //find pp id
    const pp = await AppDataSource.manager.findOneBy(PassPoint, {
        id: ppId
    });

    if(!pp)
        throw error(404, "Pass Point not found")

    await AppDataSource.manager.remove(pp);

    return json("passpoint deleted", {
        status: 200
    });
};