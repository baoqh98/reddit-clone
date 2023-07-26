const mongoose = require('mongoose');

const topicSchema = mongoose.Schema({
  topic: {
    type: String,
    require: [true, 'Topic must have name'],
    unique: [true, 'Topic already exist'],
  },
  member: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  post: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    },
  ],
});

const Topic = mongoose.model('Topic', topicSchema);

module.exports = Topic;
