/** @type {import('./$types').LayoutLoad} */

export function load({ request, locals, cookies }) {
  return {
    user: locals.user,
  };
}
