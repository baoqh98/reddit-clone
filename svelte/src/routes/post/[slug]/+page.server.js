import { apiEndpoint } from '../../../utils/global/apiEndpoint';
import FormDataFeature from '$lib/FormDataFeature';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  try {
    const response = await fetch(`${apiEndpoint.postEndpoint}/${params.slug}`);
    const responseData = await response.json();
    return {
      post: responseData.data,
    };
  } catch (error) {}
}

/** @type {import('./$types').Actions} */
export const actions = {
  comment: async ({ request, locals, params }) => {
    try {
      const formDataFeature = new FormDataFeature({ request, locals, params }, [
        'comment',
      ]);
      const { comment } = await formDataFeature.getFormData();
      const text = comment;

      if (!text) return;
      const user = locals.user;

      if (!user.isAuthenticated)
        throw error(401, { message: 'You are not logged in!' });
      const bodyData = {
        user: user._id,
        post: params.slug,
        text,
      };

      await fetch(apiEndpoint.commentEndpoint, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(bodyData),
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
      const formDataFeature = new FormDataFeature({ request, locals, params }, [
        'id',
      ]);
      const { id } = await formDataFeature.getFormData();
      const user = locals.user;

      if (!id) return { success: false };

      if (!user.isAuthenticated)
        throw error(401, { message: 'You are not logged in!' });

      await fetch(`${apiEndpoint.commentEndpoint}/${id}`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
        method: 'DELETE',
      });

      return {
        success: true,
        delete: true,
      };
    } catch (error) {
      throw error;
    }
  },
  editComment: async ({ request, locals, params }) => {
    try {
      const formDataFeature = new FormDataFeature({ request, locals, params }, [
        'id',
        'commentToEdit',
      ]);
      const { id, commentToEdit } = await formDataFeature.getFormData();
      const user = locals.user;

      if (!user.isAuthenticated)
        throw error(401, { message: 'You are not logged in!' });

      await fetch(`${apiEndpoint.commentEndpoint}/${id}`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
          'Content-Type': 'application/json',
        },
        method: 'PATCH',
        body: JSON.stringify({ text: commentToEdit }),
      });

      return {
        success: true,
        edit: true,
      };
    } catch (error) {
      console.log(error);
    }
  },
};
