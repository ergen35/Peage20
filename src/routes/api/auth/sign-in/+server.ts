// import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async function() {
    // if(locals.user){
    //     if(locals.user.userType == "regular-user"){
    //         return redirect(302, '/dashboard')
    //     }
    // }
    return new Response();
};