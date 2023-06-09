import express from 'express';
import {
  createPost,
  deletePost,
  getAllPost,
  getPost,
  updatePost,
} from '../controllers/postController.js';

const router = express.Router();

router.route('/').get(getAllPost).post(createPost);

router.route('/:id').get(getPost).patch(updatePost).delete(deletePost);

export default router;
