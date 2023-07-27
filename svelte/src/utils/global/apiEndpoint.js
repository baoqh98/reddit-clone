const baseURL = import.meta.env.PROD
  ? 'https://calm-pear-pig-wig.cyclic.app/api'
  : 'http://localhost:3000';

export const apiEndpoint = {
  topicEndpoint: `${baseURL}/api/topic`,
  photoPostEndpoint: `${baseURL}/api/post/mediaPost`,
  postEndpoint: `${baseURL}/api/post`,
  logoutEndpoint: `${baseURL}/api/auth/logout`,
  registerEndpoint: `${baseURL}/api/aut/register`,
  loginEndpoint: `${baseURL}/api/auth/login`,
  userEndPoint: `${baseURL}/api/user`,
  commentEndpoint: `${baseURL}/api/comment`,
  voteEndpoint: `${baseURL}/api/vote`,
};
