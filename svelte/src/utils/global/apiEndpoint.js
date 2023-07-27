const baseURL = import.meta.env.PROD
  ? 'https://reddit-clone-bqh-api-web-service.onrender.com/api'
  : 'http://localhost:3000/api';
console.log(baseURL);
export const apiEndpoint = {
  topicEndpoint: `${baseURL}/topic`,
  photoPostEndpoint: `${baseURL}/post/mediaPost`,
  postEndpoint: `${baseURL}/post`,
  logoutEndpoint: `${baseURL}/auth/logout`,
  registerEndpoint: `${baseURL}/auth/register`,
  loginEndpoint: `${baseURL}/auth/login`,
  userEndPoint: `${baseURL}/user`,
  commentEndpoint: `${baseURL}/comment`,
  voteEndpoint: `${baseURL}/vote`,
};
