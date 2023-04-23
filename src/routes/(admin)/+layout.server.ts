import type { LayoutServerLoad } from './admin/$types';
import {AppUserInfos} from '$lib/entities';

export const load = (async () => {
    //TODO: get real data
    const appu = new AppUserInfos()
    appu.userType = 'super-admin'
    return {
        user: structuredClone(appu)
    };
}) satisfies LayoutServerLoad;