import type { LayoutServerLoad } from './$types';

export const load = (async () => {
    return {
        user: null
    };
}) satisfies LayoutServerLoad;