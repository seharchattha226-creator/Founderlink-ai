const express = require('express');
const {
  register,
  login,
  getMe,
  forgotPassword,
  resetPassword,
  verifyEmail,
  verifyOTP,
  resendOTP,
  googleAuth,
  githubAuth,
} = require('../controllers/authController');
const { validateRegister, validateLogin, validateEmail, validatePassword } = require('../middleware/validate');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
router.get('/me', protect, getMe);
router.post('/forgot-password', validateEmail, forgotPassword);
router.put('/reset-password/:token', validatePassword, resetPassword);
router.get('/verify-email/:token', verifyEmail);
router.post('/verify-otp', verifyOTP);
router.post('/resend-otp', resendOTP);
router.post('/google', googleAuth);
router.post('/github', githubAuth);

module.exports = router;
