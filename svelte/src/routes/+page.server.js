import FormDataFeature from '$lib/FormDataFeature';
import axios from 'axios';
import { apiEndpoint, api_base_url } from '../utils/global/apiEndpoint';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ parent, fetch }) => {
  const { user } = await parent();
  const res = await fetch(apiEndpoint.postEndpoint);
  const { data } = await res.json();
  return { user, posts: data };
};

/** @type {import('./$types').Actions} */
export const actions = {
  deletePost: async ({ request, locals, params }) => {
    try {
      const formDataFeature = new FormDataFeature({ request, locals, params }, [
        'postIdDelete',
      ]);
      const { postIdDelete } = await formDataFeature.getFormData();

      const res = await fetch(`${apiEndpoint.postEndpoint}/${postIdDelete}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${locals.user.accessToken}`,
        },
      });

      const data = await res.json();

      return { success: true, message: 'Your post delete successfully!' };
    } catch (err) {
      throw error(401, {
        message:
          'Something wrong! Check your account authorization or send us the the report!',
        data: err.response.data,
      });
    }
  },

  editPost: async ({ request, locals, params }) => {},
};
