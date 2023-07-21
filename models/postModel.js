const mongoose = require('mongoose');
const slugify = require('slugify');
const VotePost = require('./votePostModel');
const Comment = require('./commentPostModel');

const postSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Post must belong to a user'],
    },
    topic: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Cannot post without a topic'],
      ref: 'Topic',
    },
    postType: {
      type: String,
      enum: ['content', 'media'],
      require: true,
      default: function () {
        if (this.mediaLocation) return 'media';
        else return 'content';
      },
    },
    title: {
      type: String,
      required: [true, 'Post need a title'],
    },
    content: {
      type: String,
      validate: function (val) {
        if (this.postType === 'content' && !val) return false;
        else return true;
      },
    },
    mediaLocation: {
      type: String,
      validate: function (val) {
        if (this.postType === 'media' && !val) return false;
        else return true;
      },
    },
    nsfw: {
      type: Boolean,
      default: false,
    },
    slug: String,
    createdAt: {
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
postSchema.virtual('vote', {
  ref: 'VotePost',
  foreignField: 'post',
  localField: '_id',
  justOne: true,
});

postSchema.pre('save', async function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

postSchema.pre('find', function (next) {
  const isDisableMiddlewares = this.options.disableMiddlewares;
  console.log(isDisableMiddlewares);
  this.populate({
    path: 'comments',
    select: `${
      isDisableMiddlewares ? '_id user text -post' : '_id user -post'
    }`,
  })
    .populate({
      path: 'topic',
      select: 'topic',
    })
    .populate({
      path: 'author',
      select: 'username',
    })
    .populate({
      path: 'vote',
      select: 'voteScore -post -_id',
    })
    .sort('-createdAt');

  next();
});

postSchema.pre('findOne', function (next) {
  this.populate({ path: 'comments' }).populate('topic').populate('vote');
  next();
});

postSchema.pre('findOneAndDelete', async function (next) {
  const postId = new mongoose.Types.ObjectId(this.getFilter()._id);
  await VotePost.findOneAndDelete({ post: postId });
  await Comment.findOneAndDelete({ post: postId });
  next();
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
