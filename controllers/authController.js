import User from '../models/userModel.js';
import { catchAsync } from '../utils/catchAsync.js';
import AppError from '../utils/AppError.js';

export const signUp = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    username: req.body.username,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  res.status(201).json({
    status: 'success',
    message: 'Sign Up successfully!',
    data: newUser,
  });
});

export const logIn = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).select('+password');

  console.log(user);

  if (!user || !(await user.checkPassword(password, user.password))) {
    return next(new AppError(`Incorrect email or password'`, 401));
  }
  res.status(200).json({
    status: 'success',
    data: user,
  });
});
