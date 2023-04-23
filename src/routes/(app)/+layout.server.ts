import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
    return {
        user: structuredClone(locals.user)
    };
}) satisfies LayoutServerLoad;