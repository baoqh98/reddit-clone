const express = require('express');
const { getAllUser, getUser } = require('../controllers/userController');

const router = express.Router();

router.route('/').get(getAllUser);
router.route('/:id').get(getUser);

module.exports = router;
