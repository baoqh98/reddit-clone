// @ts-ignore: Deprecated constructor syntax
const mongoose = require('mongoose');
const {
  getAll,
  getOne,
  updateOne,
  deleteOne,
  createOne,
} = require('./handlerFactory');
const Post = require('../models/postModel');
const catchAsync = require('../utils/catchAsync');
const { uploadPostImage } = require('../models/cloudinaryModel');
const AppError = require('../utils/AppError');
const User = require('../models/userModel');

// specific controller
exports.getAllPost = getAll(Post);
exports.getPost = getOne(Post);
exports.updatePost = updateOne(Post);
exports.deletePost = deleteOne(Post);

// upload post photo
exports.createPostWithPhoto = catchAsync(async (req, res, next) => {
  const result = await uploadPostImage(req.file.path);

  const post = await Post.create({
    author: new mongoose.Types.ObjectId(req.body.authorId),
    title: req.body.title,
    topic: new mongoose.Types.ObjectId(req.body.topic),
    mediaLocation: result.url,
    nsfw: req.body.nsfw,
  });

  const savedPost = await post.save();

  res.status(201).json({
    status: 'success',
    data: savedPost,
  });
});

exports.createPostWithContent = catchAsync(async (req, res, next) => {
  const post = await Post.create({
    author: new mongoose.Types.ObjectId(req.body.authorId),
    topic: new mongoose.Types.ObjectId(req.body.topic),
    title: req.body.title,
    content: req.body.content,
    nsfw: req.body.nsfw,
  });

  res.status(201).json({
    status: 'success',
    data: post,
  });
});

exports.getPostByUser = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ username: req.params.username });
  if (!user) return next(new AppError('Something Wrong!', 404));
  const postByUser = await Post.find(
    {
      author: new mongoose.Types.ObjectId(user.id),
    },
    null,
    { disableMiddlewares: true }
  );

  res.status(200).json({
    status: 'success',
    data: postByUser,
  });
});
