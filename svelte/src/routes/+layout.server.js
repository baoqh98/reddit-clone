/** @type {import('./$types').LayoutServerLoad} */

import { redirect } from '@sveltejs/kit';

export async function load({ request, locals, cookies, params }) {
  if (params.slug === 'logout') {
    cookies.delete('reddit_clone_jwt', {
      path: '/',
    });

    throw redirect(302, '/auth/login');
  }
  return {
    user: locals.user,
  };
}
