import axios, { AxiosError } from 'axios';

export async function vote(url, type, user, postId) {
  const body = { user: user.id, post: postId };
  const headerConfig = {
    headers: {
      Authorization: `Bearer ${user.accessToken}`,
    },
  };
  try {
    if (!user.isAuthenticated)
      throw new AxiosError('You need log in to vote', 401);
    let res;
    switch (type) {
      case 'UPVOTE':
        res = (await axios.patch(url, body, headerConfig)).data;
        break;
      case 'DOWNVOTE':
        res = (await axios.patch(url, body, headerConfig)).data;
        break;
    }
    return res;
  } catch (error) {
    throw error;
  }
}

export const isVoted = (post, user, TYPE) => {
  switch (TYPE) {
    case 'UPVOTE':
      return post.vote?.upVoter.some((item) => item.id === user.id);
    case 'DOWNVOTE':
      return post.vote?.downVoter.some((item) => item.id === user.id);
  }
};
