const bcrypt = require('bcrypt');
const validator = require('validator');
const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'username is required'],
      unique: [true, 'username has already existed'],
      validate: {
        validator: function (value) {
          return /^[a-zA-Z0-9]{4,20}$/.test(value);
        },
        message:
          'Username do not contain special character (4 - 20 characters)',
      },
    },
    email: {
      type: String,
      lowercase: true,
      unique: [true, 'email has already existed'],
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    password: {
      type: String,
      required: [true, 'password is required'],
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, 'you need to confirm your password'],
      validate: {
        validator: function (v) {
          return this.password === v;
        },
        message: 'Fail to confirm password',
      },
      select: false,
    },

    created: {
      type: Date,
      default: Date.now(),
    },
    passwordChangedAt: Date,
    userRefreshExpires: Date,
    userRefreshToken: String,
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.methods.checkPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compareSync(candidatePassword, userPassword);
};

userSchema.methods.updateRefreshToken = function () {
  const refreshToken = crypto.randomBytes(32).toString('hex');

  this.userRefreshToken = crypto
    .createHash('sha256')
    .update(refreshToken)
    .digest('hex');

  this.userRefreshExpires = Date.now() + 10 * 60 * 1000;

  return refreshToken;
};

userSchema.methods.changePasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }

  return false;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
