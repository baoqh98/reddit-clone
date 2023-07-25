import { apiEndpoint } from '../../../utils/global/apiEndpoint';
import axios from 'axios';
/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  const userInfo = await axios.get(
    `${apiEndpoint.userEndPoint}?username=${params.slug}`
  );
  const postResponse = await axios.get(
    `${apiEndpoint.postEndpoint}/postByUser/${params.slug}`
  );

  return {
    postByUser: postResponse.data.data,
    userFromParams: userInfo.data.data[0],
  };
}
