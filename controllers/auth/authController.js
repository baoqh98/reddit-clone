const User = require('../../models/userModel.js');
const catchAsync = require('../../utils/catchAsync.js');
const AppError = require('../../utils/AppError.js');
const { generateToken, decodeToken } = require('./authMethods.js');

const accessTokenSecret = process.env.JWT_SECRET;
const accessTokenExpiresIn = process.env.JWT_EXPIRES_IN;

exports.register = catchAsync(async (req, res, next) => {
  const username = req.body.username.trim();
  const email = req.body.email.trim();
  const { password, passwordConfirm, dateOfBirth } = req.body;
  const user = await User.findOne({ username });

  if (user) return next(new AppError('user already exist', 409));

  const newUser = await User.create({
    username,
    email,
    password,
    passwordConfirm,
    dateOfBirth,
  });

  res.status(200).json({
    status: 'success',
    data: newUser,
  });

  next();
});

exports.login = catchAsync(async (req, res, next) => {
  const username = req.body.username.trim();
  const password = req.body.password;

  //1) Check if email and password exist
  if (!username || !password)
    return next(new AppError('Please provide username and password', 400));

  const user = await User.findOne({ username }).select(
    '+password +userRefreshExpires'
  );

  // 2) Check if user exists && password is correct
  if (!user || !(await user.checkPassword(password, user.password)))
    return next(new AppError(`Incorrect email or password`, 401));

  // 3) generate token
  const accessToken = await generateToken(
    user.username,
    accessTokenSecret,
    accessTokenExpiresIn
  );

  if (!accessToken)
    return next(new AppError('Login Fail. Please try again!', 401));

  let refreshToken;
  if (!user.userRefreshToken) {
    refreshToken = user.updateRefreshToken();
    await user.save();
  } else {
    refreshToken = user.userRefreshToken;
  }

  return res.status(200).json({
    status: 'success',
    message: 'Login successfully!',
    data: {
      user,
      accessToken,
      userRefreshToken: refreshToken,
    },
  });
});

exports.refreshToken = catchAsync(async (req, res, next) => {
  // get accessToken from headers
  let accessTokenHeader;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    accessTokenHeader = req.headers.authorization.split(' ')[1];
  } else {
    return next(new AppError('Can not find accessToken', 401));
  }

  // get refreshToken from body
  const refreshTokenBody = req.body.userRefreshToken;
  if (!refreshTokenBody)
    return next(new AppError('Can not find refreshToken', 400));

  // decode accessToken
  const decodedAccessToken = await decodeToken(
    accessTokenHeader,
    accessTokenSecret
  );
  if (!decodedAccessToken)
    return next(new AppError('Invalid Access Token', 400));
  const username = decodedAccessToken.payload;

  // find user by access token
  const user = await User.findOne({ username });
  if (!user) return next(new AppError('User does not exist', 401));
  if (refreshTokenBody !== user.userRefreshToken)
    return next(new AppError('Invalid Refresh Token'));

  // generate new access token
  const newAccessToken = await generateToken(
    user.username,
    accessTokenSecret,
    accessTokenExpiresIn
  );

  if (!newAccessToken)
    return next(new AppError('Fail to generate new access token', 400));

  res.status(200).json({
    status: 'success',
    message: 'Refresh Token successfully',
    data: {
      accessToken: newAccessToken,
      user,
    },
  });
});
