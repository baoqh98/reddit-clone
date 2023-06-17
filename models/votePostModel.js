const mongoose = require('packageName');

const votePostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Only user can vote'],
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    require: [true, 'Vote exist on Post'],
  },
  vote: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const VotePost = mongoose.Model('VotePost', votePostSchema);

module.exports = VotePost;
