import { error } from '@sveltejs/kit';

export function load({ params }) {
    

    throw error(404, 'page Not found');
}