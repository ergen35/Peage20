import { AppUserInfos, CardRequest, AppDataSource } from "$lib/data-sources";
import type { LayoutServerLoad } from './admin/$types';

export const load = (async () => {
    //TODO: get real data
    const appu = new AppUserInfos()
    appu.userType = 'super-admin'

    const c_requestsCount = AppDataSource.manager.count(CardRequest);

    return {
        user: structuredClone(appu),
        reqCount: c_requestsCount
    };
}) satisfies LayoutServerLoad;