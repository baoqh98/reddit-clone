const express = require('express');
const {
  getAllPost,
  getPost,
  updatePost,
  deletePost,
  createPostWithPhoto,
  createPostWithContent,
  getPostByUser,
} = require('../controllers/postController');
const { upload, resizeImage } = require('../controllers/uploadController');
const { authProtect } = require('../controllers/auth/authMiddlewares');

const router = express.Router();

router.route('/').get(getAllPost).post(authProtect, createPostWithContent);
router
  .route('/mediaPost')
  .post(authProtect, upload.single('file'), resizeImage, createPostWithPhoto);
router
  .route('/:id')
  .get(getPost)
  .patch(authProtect, updatePost)
  .delete(authProtect, deletePost);
router.route('/postByUser/:username').get(getPostByUser);

module.exports = router;
