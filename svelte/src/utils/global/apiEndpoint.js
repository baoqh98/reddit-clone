export const api_base_url = import.meta.env.PROD
  ? 'https://calm-pear-pig-wig.cyclic.app/api'
  : 'http://localhost:3000/api';

export const apiEndpoint = {
  topicEndpoint: `${api_base_url}/topic`,
  photoPostEndpoint: `${api_base_url}/post/mediaPost`,
  postEndpoint: `${api_base_url}/post`,
  logoutEndpoint: `${api_base_url}/auth/logout`,
  registerEndpoint: `${api_base_url}/auth/register`,
  loginEndpoint: `${api_base_url}/auth/login`,
  userEndPoint: `${api_base_url}/user`,
  commentEndpoint: `${api_base_url}/comment`,
  voteEndpoint: `${api_base_url}/vote`,
};
