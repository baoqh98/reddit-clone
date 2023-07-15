const express = require('express');
const {
  getAllPost,
  getPost,
  updatePost,
  deletePost,
  createPostWithPhoto,
  createPostWithContent,
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
  .delete(deletePost);

module.exports = router;
