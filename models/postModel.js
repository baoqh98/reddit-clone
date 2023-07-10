const mongoose = require('mongoose');
const slugify = require('slugify');

const postSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Post must belong to a user'],
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
    topic: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Cannot post without a topic'],
      ref: 'Topic',
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
    vote: { type: Number, default: 0 },
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

postSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

postSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'comments',
    select: '_id',
  }).populate({
    path: 'topic',
    select: 'topic',
  });

  next();
});

postSchema.pre('findOne', function (next) {
  // this.populate({
  //   path: 'author',
  //   select: 'username',
  // }).select('-__v');

  next();
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
