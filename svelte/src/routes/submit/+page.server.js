import { apiEndpoint } from '../../utils/global/apiEndpoint';

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ fetch, parent }) => {
  const res = await fetch(apiEndpoint.topicEndpoint);
  const { data } = await res.json();
  const { user } = await parent();
  return { topics: data, user };
};
