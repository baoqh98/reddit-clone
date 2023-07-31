import { error } from '@sveltejs/kit';
import { apiEndpoint } from '../../../utils/global/apiEndpoint';
import axios from 'axios';
import { JWT_COOKIE_EXPIRES_IN } from '$env/static/private';

/** @type {import('./$types').Actions} */
const accessTokenExpiresIn = JWT_COOKIE_EXPIRES_IN;

export const actions = {
  login: async ({ request, cookies }) => {
    try {
      const formData = await request.formData();
      const username = formData.get('username');
      const password = formData.get('password');

      const res = (
        await axios.post(apiEndpoint.loginEndpoint, {
          username,
          password,
        })
      ).data;

      const requestAuthData = res.data;

      if (requestAuthData) {
        cookies.set('reddit_clone_jwt', requestAuthData.accessToken, {
          path: '/',
          expires: new Date(
            Date.now() + accessTokenExpiresIn * 24 * 60 * 60 * 1000
          ),
        });
      }
      return { success: true, register: false, message: 'Login Successfully!' };
    } catch (err) {
      const errMessages = err.response.data.message
        .replace('User validation failed:', '')
        .split(',')
        .map((item) => item.trim(' '));
      throw error(401, {
        messages: errMessages,
      });
    }
  },
  register: async ({ request, cookies }) => {
    try {
      const formData = await request.formData();
      const username = formData.get('username');
      const password = formData.get('password');
      const passwordConfirm = formData.get('passwordConfirm');
      const email = formData.get('email');

      console.log(username, password, passwordConfirm, email);
      const res = (
        await axios.post(apiEndpoint.registerEndpoint, {
          email,
          username,
          password,
          passwordConfirm,
        })
      ).data;

      return {
        success: true,
        register: true,
        message: 'Register Successfully!',
      };
    } catch (err) {
      const errMessages = err.response.data.message
        .replace('User validation failed:', '')
        .split(',')
        .map((item) => item.trim(' '));
      throw error(401, {
        messages: errMessages,
      });
    }
  },
};
