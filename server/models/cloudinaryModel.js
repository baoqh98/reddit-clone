const fs = require('fs');
const cloudinary = require('cloudinary').v2;

const cloudinaryName = process.env.CLOUDINARY_NAME;
const cloudinaryAPIKey = process.env.CLOUDINARY_API_KEY;
const cloudinaryAPISecret = process.env.CLOUDINARY_API_SECRET;

cloudinary.config({
  cloud_name: cloudinaryName,
  api_key: cloudinaryAPIKey,
  api_secret: cloudinaryAPISecret,
});

const uploadPostImage = (filePath) => {
  return new Promise((resolve) => {
    cloudinary.uploader
      .upload(filePath, {
        folder: 'post',
      })
      .then((result) => {
        fs.unlinkSync(filePath);
        resolve({ url: result.secure_url });
      });
  });
};

module.exports = { uploadPostImage };
