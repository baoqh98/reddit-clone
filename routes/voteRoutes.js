const express = require('express');
const {
  getAllVote,
  upvote,
  downvote,
} = require('../controllers/voteController');
const { authProtect } = require('../controllers/auth/authMiddlewares');

const router = express.Router();

router.route('/').get(getAllVote);
router.route('/upvote').patch(authProtect, upvote);
router.route('/downvote').patch(authProtect, downvote);
module.exports = router;
