const mongoose = require('mongoose');
const AppError = require('../utils/AppError');

const votePostSchema = new mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    require: [true, 'Vote exist on Post'],
  },
  upVoter: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  downVoter: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  voteScore: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

votePostSchema.post('findOneAndUpdate', async function (doc, next) {
  const upVoterScore = doc.upVoter.length;
  const downVoterScore = doc.downVoter.length;
  const voteScore = upVoterScore - downVoterScore;
  doc.voteScore = voteScore;
  await doc.save();
  next();
});

votePostSchema.pre('save', async function (next) {});

const VotePost = mongoose.model('VotePost', votePostSchema);

module.exports = VotePost;
