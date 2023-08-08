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
      const formData = await request.formData();
      const text = formData.get('comment');
      if (!text) return;
      const user = locals.user;

      if (!user.isAuthenticated)
        throw new AxiosError('You are not logged in!', '400');
      const data = {
        user: user._id,
        post: params.slug,
        text,
      };

      await axios.post(apiEndpoint.commentEndpoint, data, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });

      return {
        success: true,
      };
    } catch (error) {
      return error;
    }
  },
  deleteComment: async ({ request, locals, params }) => {
    try {
      const formData = await request.formData();
      const id = formData.get('id');
      const user = locals.user;

      if (!id) return { success: false };

      if (!user.isAuthenticated)
        throw new AxiosError('You are not logged in!', '400');

      await axios.delete(`${apiEndpoint.commentEndpoint}/${id}`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });

      return {
        success: true,
        delete: true,
      };
    } catch (error) {
      console.log(error);
    }
  },
  editComment: async ({ request, locals, params }) => {
    try {
      const formData = await request.formData();
      const id = formData.get('id');
      const comment = formData.get('commentToEdit');
      const user = locals.user;

      await axios.patch(
        `${apiEndpoint.commentEndpoint}/${id}`,
        { text: comment },
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );

      return {
        success: true,
        edit: true,
      };
    } catch (error) {
      console.log(error);
    }
  },
};
