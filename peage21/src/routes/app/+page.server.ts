import type { PageServerLoad } from './$types';
import { AppDataSource } from '../../data/data-sources';
import { PassPoint } from '../../entities/entities';

export const load = (async () => {

    let pp = new PassPoint();
    pp.geoAddress = "45'25E'95'0N";
    pp.name = "Oslo Pass way";
    pp.usageRecords = []

    const ppRepos = AppDataSource.getRepository(PassPoint);
    pp = await ppRepos.save(pp);

    return {
        thisPP: pp
    };
}) satisfies PageServerLoad;