import FormDataFeature from '$lib/FormDataFeature';
import axios from 'axios';
import { apiEndpoint } from '../utils/global/apiEndpoint';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ parent }) => {
  const { user } = await parent();
  const res = (await axios.get(apiEndpoint.postEndpoint)).data;
  const posts = res.data;
  return { user, posts };
};

/** @type {import('./$types').Actions} */
export const actions = {
  deletePost: async ({ request, locals, params }) => {
    try {
      const formDataFeature = new FormDataFeature({ request, locals, params }, [
        'postIdDelete',
      ]);
      const formDataObj = await formDataFeature.getFormData();
      const { postIdDelete } = formDataObj;

      await axios.delete(`${apiEndpoint.postEndpoint}/${postIdDelete}`, {
        headers: {
          Authorization: `Bearer ${locals.user.accessToken}`,
        },
      });

      return { success: true, message: 'Your post delete successfully!' };
    } catch (err) {
      console.log(err);
      throw error(401, {
        message:
          'Something wrong! Check your account authorization or send us the the report!',
        data: err.response.data,
      });
    }
  },
};
