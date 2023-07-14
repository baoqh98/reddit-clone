const express = require('express');
const {
  getAllVote,
  upvote,
  downvote,
  resetVote,
} = require('../controllers/voteController');

const router = express.Router();

router.route('/').get(getAllVote);
router.route('/upvote').patch(upvote);
router.route('/downvote').patch(downvote);
module.exports = router;
