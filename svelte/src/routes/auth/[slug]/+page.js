import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export const csr = true
export function load({ params }) {
    if (params.slug === 'register') {
        return {
            slug: 'register',
        };
    } else if(params.slug === 'login') {
        return {
            slug: 'login'
        }
    }

    throw error(404, 'Not found');
}