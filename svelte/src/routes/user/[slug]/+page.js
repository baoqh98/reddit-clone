import { apiEndpoint } from '../../../utils/global/apiEndpoint';
import axios from 'axios';
/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  const res = await axios.get(
    `${apiEndpoint.postEndpoint}/postByUser/${params.slug}`
  );
  return {
    postByUser: res.data.data,
  };
}
