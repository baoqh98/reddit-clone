import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export const csr = true;
export async function load({ params, parent }) {
  const { user } = await parent();
  if (params.slug === 'register') {
    return {
      slug: 'register',
      user,
    };
  } else if (params.slug === 'login') {
    return {
      slug: 'login',
      user,
    };
  }

  throw error(404, 'Not found');
}
