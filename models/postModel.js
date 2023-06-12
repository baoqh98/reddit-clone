const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Post must belong to a user'],
    },
    title: {
      type: String,
      required: [true, 'Post need a title'],
    },
    content: {
      type: String,
      required: [true, 'Cannot post without a content'],
    },
    topic: {
      type: String,
      required: [true, 'Cannot post without a topic'],
    },
    vote: {
      type: Number,
      default: 0,
    },
    nsfw: {
      type: Boolean,
      default: false,
    },
    created: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// virtual populate
postSchema.virtual('comments', {
  ref: 'Comment',
  foreignField: 'post',
  localField: '_id',
});

postSchema.pre('find', function (next) {
  this.populate({
    path: 'comments',
    select: '_id -post',
  });

  next();
});

postSchema.pre('findOne', function (next) {
  this.populate({
    path: 'comments',
    populate: {
      path: 'user',
      select: 'username',
    },
    select: '-createdAt -updatedAt -__v',
  })
    .populate({
      path: 'author',
      select: 'username',
    })
    .select('-__v');

  next();
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
