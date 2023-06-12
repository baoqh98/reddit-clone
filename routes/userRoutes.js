const express = require('express');
const { signUp, logIn } = require('../controllers/authController');

const router = express.Router();

router.post('/signUp', signUp);
router.post('/logIn', logIn);

module.exports = router;
