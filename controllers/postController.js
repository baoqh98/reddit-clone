const {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} = require('./handlerFactory');
const Post = require('../models/postModel');

exports.getAllPost = getAll(Post);
exports.getPost = getOne(Post);
exports.createPost = createOne(Post);
exports.updatePost = updateOne(Post);
exports.deletePost = deleteOne(Post);
