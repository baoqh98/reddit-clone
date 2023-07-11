const multer = require('multer');
const path = require('path');
const sharp = require('sharp');
const catchAsync = require('../utils/catchAsync');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve('./uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Reddit only accept image file'));
  }
};

exports.upload = multer({
  storage: storage,
  fileFilter: multerFilter,
});

exports.resizeImage = (req, res, next) => {
  let query = req.body;
  if (!req.body && !req.file) {
    res.json({ success: false });
  } else {
    sharp(req.file.path).toFormat('jpeg').jpeg({ quality: 90 });
  }
  next();
};
