const express = require('express');
const router = express.Router();

const {
  register,
  login,
  refreshToken,
  logout,
} = require('../controllers/auth/authController');
const { authProtect } = require('../controllers/auth/authMiddlewares');

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/resetPassword').post(refreshToken);
router.route('/authProtect').get(authProtect);
router.route('/logout').get(logout);

module.exports = router;
