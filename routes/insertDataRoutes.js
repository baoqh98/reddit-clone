const express = require('express');
const { insertMany } = require('../utils/insertMany');
const Post = require('../models/postModel');
const Comment = require('../models/commentPostModel');
const postData = require('../public/js/postData');
const commentData = require('../public/js/commentData');

const router = express.Router();

router.route('/post').post(insertMany(Post, postData));
router.route('/comment').post(insertMany(Comment, commentData));

module.exports = router;
