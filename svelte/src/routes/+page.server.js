/** @type {import('./$types').Actions} */

export const actions = {
  logout: async (event) => {
    console.log('logout');
    // event.cookies.delete('reddit_clone_jwt');
    // event.locals.user = null;
  },
};
