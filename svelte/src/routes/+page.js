/** @type {import('./$types').PageLoad} */
import axios from 'axios';
import { apiEndpoint } from '../utils/global/apiEndpoint';

export const load = async ({ parent }) => {
  const { user } = await parent();
  const res = (await axios.get(apiEndpoint.postEndpoint)).data;
  const posts = res.data;
  return { user, posts };
};
