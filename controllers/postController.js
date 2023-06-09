import {
  deleteOne,
  getAll,
  getOne,
  createOne,
  updateOne,
} from './handlerFactory.js';
import Post from '../models/postModel.js';

export const getAllPost = getAll(Post);
export const getPost = getOne(Post);
export const createPost = createOne(Post);
export const updatePost = updateOne(Post);
export const deletePost = deleteOne(Post);

