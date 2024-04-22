import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals, cookies }) => {
    
    locals.user = null;
    
    cookies.delete("Pag20_CTKN", {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        expires: new Date(Date.now() - 35000)
    });

    //TODO: May delete linked session
    
    throw redirect( 302, "/")
}) satisfies PageServerLoad;