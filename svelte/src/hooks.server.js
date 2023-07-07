/** @type {import('@sveltejs/kit').Handle} */
/** @type {import('@sveltejs/kit').HandleFetch} */
import { CLIENT_JWT_SECRET } from '$env/static/private';
import jsonwebtoken from 'jsonwebtoken';
import axios from 'axios';
import { apiEndpoint } from './utils/global/apiEndpoint';

const unProtectedRoutes = [];

function redirect(location, body) {
  return new Response(body, {
    status: 303,
    headers: { location },
  });
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
        ...currentUser.data,
      };
    }
    const response = await resolve(event);
    return response;
  } catch (error) {
    // console.log(error);
  }
}
