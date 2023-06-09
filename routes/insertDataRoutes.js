import express from 'express';
import { insertMany } from '../utils/insertMany.js';
import Post from '../models/postModel.js';
import { postData } from '../public/js/postData.js'; 

const router = express.Router();

router.route('/post').post(() => insertMany(Post, postData));

export default router;
