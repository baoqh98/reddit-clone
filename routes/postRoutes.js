const express = require('express');
const {
  getAllPost,
  getPost,
  updatePost,
  deletePost,
  createPostWithPhoto,
  createPostWithContent,
} = require('../controllers/postController');
const upload = require('../controllers/uploadController');

const router = express.Router();

router.route('/').get(getAllPost).post(createPostWithContent);
router.route('/mediaPost').post(upload.single('file'), createPostWithPhoto);
router.route('/:id').get(getPost).patch(updatePost).delete(deletePost);

module.exports = router;
