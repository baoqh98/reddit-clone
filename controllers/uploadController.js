const multer = require('multer');
const path = require('path');
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

const upload = multer({
  storage: storage,
  fileFilter: multerFilter,
});

// const resizeImage = catchAsync(async (req, res, next) => {
//   console.log(req);
//   next();
// });

module.exports = { upload };
