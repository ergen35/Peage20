import type { LayoutServerLoad } from './app/$types';

export const load: LayoutServerLoad = (async ({ locals }) => {
    return {
        user: structuredClone(locals.user),
    };
}) satisfies LayoutServerLoad;