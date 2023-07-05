import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = (async ({ locals }) => {
    return {
        user: structuredClone(locals.user),
    };
}) satisfies LayoutServerLoad;