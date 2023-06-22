const express = require('express');
const {
  getAllTopic,
  getTopic,
  createTopic,
  updateTopic,
  deleteTopic,
} = require('../controllers/topicController');

const router = express.Router();

router.route('/').get(getAllTopic).post(createTopic);
router.route('/:id').get(getTopic).patch(updateTopic).delete(deleteTopic);

module.exports = router;
