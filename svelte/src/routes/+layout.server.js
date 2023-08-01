/** @type {import('./$types').LayoutLoad} */
/** @type {import('./$types').LayoutServerLoad} */

import { invalidateAll } from '$app/navigation';
export function load({ request, locals, cookies, params }) {
  if (params.slug === 'logout') {
    cookies.delete('reddit_clone_jwt', {
      path: '/',
    });

    invalidateAll();
  }

  return {
    user: locals.user,
  };
}
