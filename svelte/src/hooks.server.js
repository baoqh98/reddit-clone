import { CLIENT_JWT_SECRET } from '$env/static/private';
import jsonwebtoken from 'jsonwebtoken';
import axios from 'axios';
import { apiEndpoint, api_base_url } from './utils/global/apiEndpoint';

/** @type {import('@sveltejs/kit').HandleFetch} */
export async function handleFetch({ request, fetch, event }) {
  return fetch(request);
}

const decodeToken = async (token, secretKey) => {
  return jsonwebtoken.verify(token, secretKey, {
    ignoreExpiration: true,
  });
};

export async function handle({ event, resolve }) {
  try {
    const jwt = event.cookies.get('reddit_clone_jwt');

    if (!jwt) {
      event.locals.user = {
        isAuthenticated: false,
      };
      return resolve(event);
    }
    const { payload } = await decodeToken(jwt, CLIENT_JWT_SECRET, {
      ignoreExpiration: true,
    });
    const currentUser = (
      await axios.get(`${apiEndpoint.userEndPoint}/${payload}`)
    ).data;
    if (currentUser.status === 'success') {
      event.locals.user = {
        isAuthenticated: true,
        accessToken: jwt,
        ...currentUser.data,
      };
    }
    const response = await resolve(event);
    return response;
  } catch (error) {
    // console.log(error);
  }
}
