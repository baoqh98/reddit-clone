const baseURL = import.meta.env.PROD
  ? 'https://calm-pear-pig-wig.cyclic.app/api'
  : 'http://localhost:3000';

export const apiEndpoint = {
  topicEndpoint: `${baseURL}/topic`,
  photoPostEndpoint: `${baseURL}/post/mediaPost`,
  postEndpoint: `${baseURL}/post`,
  logoutEndpoint: `${baseURL}/auth/logout`,
  registerEndpoint: `${baseURL}/aut/register`,
  loginEndpoint: `${baseURL}/auth/login`,
  userEndPoint: `${baseURL}/user`,
  commentEndpoint: `${baseURL}/comment`,
  voteEndpoint: `${baseURL}/vote`,
};
