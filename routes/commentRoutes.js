const express = require('express');
const {
  getAllComment,
  createComment,
  getComment,
  updateComment,
  deleteComment,
} = require('../controllers/commentController');
const { authProtect } = require('../controllers/auth/authMiddlewares');

const router = express.Router();

router.route('/').get(getAllComment).post(authProtect, createComment);
router.route('/:id').get(getComment).patch(updateComment).delete(deleteComment);

module.exports = router;
