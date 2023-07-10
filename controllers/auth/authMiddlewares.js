const User = require('../../models/userModel');
const AppError = require('../../utils/AppError');
const catchAsync = require('../../utils/catchAsync');
const { decodeToken } = require('./authMethods');

exports.authProtect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let accessToken;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    accessToken = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.reddit_clone_jwt) {
    accessToken = req.cookies.reddit_clone_jwt;
  }

  if (!accessToken) {
    return next(new AppError('Can not find access token', 401));
  }

  // 2) Verification token
  const decodedAccessToken = await decodeToken(
    accessToken,
    process.env.JWT_SECRET
  );

  console.log(decodedAccessToken);

  if (!decodeToken)
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    );

  // 3) Check if user still exists
  const currentUser = await User.findById(decodedAccessToken.payload);

  console.log(currentUser);

  // 4) Check if user changed password after the token was issued
  if (currentUser.changePasswordAfter(decodedAccessToken.iat)) {
    return next(
      new AppError('Password changed recently, please logged in again', 401)
    );
  }

  req.user = currentUser;
  next();
});

exports.isLoggedIn = catchAsync(async (req, res, next) => {
  console.log(req.cookies.reddit_clone_jwt);
  if (req.cookies.reddit_clone_jwt) {
    try {
      // verify token
      const decodedAccessToken = await decodeToken(
        accessToken,
        process.env.JWT_SECRET
      );

      // check if user still exist
      const currentUser = await User.findOne(decodedAccessToken);
      if (!currentUser) {
        return next();
      }
      // 3) Check if user changed password after the token was issued
      // THERE IS A LOGGED IN USER

      next();
    } catch (error) {}
  }

  next();
});
