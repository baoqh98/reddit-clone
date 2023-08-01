import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export const csr = true;
export async function load({ params, parent, cookies }) {
  const { user } = await parent();
  if (params.slug === 'register') {
    return {
      authFormType: 'register',
      user,
    };
  } else if (params.slug === 'login') {
    return {
      authFormType: 'login',
      user,
    };
  } else if (params.slug === 'logout') {
    return {
      logout: true,
    };
  }

  throw error(404, 'Not found');
}
