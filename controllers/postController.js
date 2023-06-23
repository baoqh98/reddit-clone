const {
  getAll,
  getOne,
  updateOne,
  deleteOne,
  createOne,
} = require('./handlerFactory');
const Post = require('../models/postModel');
const catchAsync = require('../utils/catchAsync');
const multer = require('multer');
const AppError = require('../utils/AppError');

// upload photo

const multerFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (!allowedTypes.includes(file.mimetype)) {
    cb(new AppError('Reddit only accept .jpeg .jpg and .png file extension'));
  } else {
    cb(null, true);
  }
};

const upload = multer({ fileFilter: multerFilter });
exports.resizePhoto = catchAsync(async (req, res, next) => {
  console.log('resize photo');

  next();
});

exports.createPostWithPhoto = catchAsync(async (req, res, next) => {
  console.log(req.files);

  next();
});

exports.getAllPost = getAll(Post);
exports.getPost = getOne(Post);
exports.createPost = createOne(Post);
exports.updatePost = updateOne(Post);
exports.deletePost = deleteOne(Post);
