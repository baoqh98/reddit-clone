const mongoose = require('mongoose');
const VotePost = require('../models/votePostModel');
const catchAsync = require('../utils/catchAsync');
const { getAll } = require('./handlerFactory');

exports.getAllVote = getAll(VotePost);

exports.upvote = catchAsync(async (req, res, next) => {
  const post = new mongoose.Types.ObjectId(req.body.post);
  const userObjectId = new mongoose.Types.ObjectId(req.body.user);

  const votePost = await VotePost.findOne({
    post,
  });

  let newVotePost;
  if (votePost.upVoter.includes(userObjectId)) {
    newVotePost = await VotePost.findOneAndUpdate(
      { post },
      {
        $pull: { upVoter: userObjectId },
      },
      { new: true }
    );
  } else if (votePost.downVoter.includes(userObjectId)) {
    newVotePost = await VotePost.findOneAndUpdate(
      { post },
      {
        $pull: { downVoter: userObjectId },
        $push: { upVoter: userObjectId },
      },
      { new: true }
    );
  } else {
    newVotePost = await VotePost.findOneAndUpdate(
      { post },
      {
        $push: { upVoter: userObjectId },
      },
      { new: true }
    );
  }

  res.status(200).json({
    status: 'success',
    data: newVotePost,
  });
});

exports.downvote = catchAsync(async (req, res, next) => {
  const post = new mongoose.Types.ObjectId(req.body.post);
  const userObjectId = new mongoose.Types.ObjectId(req.body.user);

  const votePost = await VotePost.findOne({
    post,
  });

  let newVotePost;
  if (votePost.downVoter.includes(userObjectId)) {
    newVotePost = await VotePost.findOneAndUpdate(
      { post },
      {
        $pull: { downVoter: userObjectId },
      },
      { new: true }
    );
  } else if (votePost.upVoter.includes(userObjectId)) {
    newVotePost = await VotePost.findOneAndUpdate(
      { post },
      {
        $pull: { upVoter: userObjectId },
        $push: { downVoter: userObjectId },
      },
      { new: true }
    );
  } else {
    newVotePost = await VotePost.findOneAndUpdate(
      { post },
      {
        $push: { downVoter: userObjectId },
      },
      { new: true }
    );
  }

  res.status(200).json({
    status: 'success',
    data: newVotePost,
  });
});
