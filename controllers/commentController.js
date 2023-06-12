const {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} = require('./handlerFactory');
const Comment = require('../models/commentModel');

exports.getAllComment = getAll(Comment);
exports.getComment = getOne(Comment);
exports.createComment = createOne(Comment);
exports.updateComment = updateOne(Comment);
exports.deleteComment = deleteOne(Comment);
