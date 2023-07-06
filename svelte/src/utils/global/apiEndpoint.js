const baseURL = 'http://localhost:3000/api';
export const apiEndpoint = {
  topicEndpoint: `${baseURL}/topic`,
  photoPostEndpoint: `${baseURL}/post/mediaPost`,
  contentPostEndpoint: `${baseURL}/post`,
  logoutEndpoint: `${baseURL}/auth/logout`,
  registerEndpoint: `${baseURL}/auth/register`,
  loginEndpoint: `${baseURL}/auth/login`,
  userEndPoint: `${baseURL}/user`,
};
