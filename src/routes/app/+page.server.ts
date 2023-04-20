import { PassPoint } from '$lib/entities';
import { AppDataSource } from '$lib/data-sources';
import type { PageServerLoad } from './$types';

export const load = (async () => {

    let pp = new PassPoint();
    pp.geoAddress = "45'25E'95'0N";
    pp.name = "Oslo Pass way";
    pp.usageRecords = []

    const ppRepos = AppDataSource.getRepository(PassPoint);
    pp = await ppRepos.save(pp);

    return {
        thisPP: structuredClone(pp)
    };
}) satisfies PageServerLoad;