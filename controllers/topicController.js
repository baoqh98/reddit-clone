const {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} = require('./handlerFactory');
const Topic = require('../models/topicModel');

exports.getAllTopic = getAll(Topic);
exports.getTopic = getOne(Topic);
exports.createTopic = createOne(Topic);
exports.updateTopic = updateOne(Topic);
exports.deleteTopic = deleteOne(Topic);
