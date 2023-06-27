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

// upload photo
exports.createPostWithPhoto = catchAsync(async (req, res, next) => {
  const result = await uploadPostImage(req.file.path);

  const post = await Post.create({
    author: req.body.author,
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

// specific controller
exports.getAllPost = getAll(Post);
exports.getPost = getOne(Post);
exports.createPostWithContent = createOne(Post);
exports.updatePost = updateOne(Post);
exports.deletePost = deleteOne(Post);
