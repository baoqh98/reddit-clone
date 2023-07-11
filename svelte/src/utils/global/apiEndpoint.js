const baseURL = 'http://localhost:3000/api';
export const apiEndpoint = {
  topicEndpoint: `${baseURL}/topic`,
  photoPostEndpoint: `${baseURL}/post/mediaPost`,
  postEndpoint: `${baseURL}/post`,
  logoutEndpoint: `${baseURL}/auth/logout`,
  registerEndpoint: `${baseURL}/auth/register`,
  loginEndpoint: `${baseURL}/auth/login`,
  userEndPoint: `${baseURL}/user`,
  commentEndpoint: `${baseURL}/comment`,
};
