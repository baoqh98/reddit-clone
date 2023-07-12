import axios, { AxiosError } from 'axios';
import { apiEndpoint } from '../../../utils/global/apiEndpoint';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  const post = (await axios.get(`${apiEndpoint.postEndpoint}/${params.slug}`))
    .data;
  return {
    post: post.data,
  };
}

/** @type {import('./$types').Actions} */
export const actions = {
  comment: async ({ request, locals, params }) => {
    try {
      // const formData = await request.formData();
      // const text = formData.get('comment');
      // if (!text) return;
      // const user = locals.user;

      // if (!user.isAuthenticated)
      //   throw new AxiosError('You are not logged in!', '400');
      // const data = {
      //   user: user._id,
      //   post: params.slug,
      //   text,
      // };

      // await axios.post(apiEndpoint.commentEndpoint, data, {
      //   headers: {
      //     Authorization: `Bearer ${user.accessToken}`,
      //   },
      // });

      return {
        success: true,
      };
    } catch (error) {
      return error;
    }
  },
};
