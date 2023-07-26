/** @type {import('./$types').LayoutLoad} */
/** @type {import('./$types').LayoutServerLoad} */

export function load({ request, locals, cookies }) {
  return {
    user: locals.user,
  };
}
