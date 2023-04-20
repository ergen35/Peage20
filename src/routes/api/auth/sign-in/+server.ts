import type { RequestHandler } from './$types';
import { AppDataSource } from '$lib/data-sources';
import { AppUserSession } from '$lib/entities';

export const GET: RequestHandler = async function() {
    return new Response();
};