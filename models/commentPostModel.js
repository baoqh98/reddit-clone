const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'You need log in to Comment this post'],
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

commentSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'username',
  });

  next();
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
