import { AppUserInfos } from "$lib/data-sources";
import type { LayoutServerLoad } from './admin/$types';

export const load = (async () => {
    //TODO: get real data
    const appu = new AppUserInfos()
    appu.userType = 'super-admin'
    return {
        user: structuredClone(appu)
    };
}) satisfies LayoutServerLoad;