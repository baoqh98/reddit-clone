/** @type {import('./$types').LayoutLoad} */
/** @type {import('./$types').LayoutServerLoad} */

import { redirect } from '@sveltejs/kit';

export function load({ request, locals, cookies, params }) {
  if (params.slug === 'logout') {
    cookies.delete('reddit_clone_jwt', {
      path: '/',
    });

    throw redirect(307, '');
  }

  return {
    user: locals.user,
  };
}
