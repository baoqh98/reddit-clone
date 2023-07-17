const mongoose = require('mongoose');

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

votePostSchema.pre('find', function (next) {
  this.populate('upVoter', 'username').populate('downVoter', 'username');
  next();
});

votePostSchema.pre('findOne', function (next) {
  this.populate({
    path: 'upVoter',
    select: 'username',
  }).populate({
    path: 'downVoter',
    select: 'username',
  });
  next();
});

votePostSchema.post('findOneAndUpdate', async function (doc, next) {
  const upVoterScore = doc.upVoter.length;
  const downVoterScore = doc.downVoter.length;
  const voteScore = upVoterScore - downVoterScore;
  doc.voteScore = voteScore;
  await doc.save();
  next();
});

const VotePost = mongoose.model('VotePost', votePostSchema);

module.exports = VotePost;
