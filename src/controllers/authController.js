const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const crypto = require('crypto');
const axios = require('axios');
const User = require('../models/User');
const { createUser: createInMemoryUser, findUserByEmail: findInMemoryUserByEmail, findUserById: findInMemoryUserById, updateUser: updateInMemoryUser } = require('../services/userStore');
const { trackUserRegistered } = require('../services/statsStore');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../utils/asyncHandler');
const sendEmail = require('../utils/sendEmail');

// Helper function to check if MongoDB is connected (always false for now)
const isMongoConnected = () => {
  return false;
};

// Generate 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
const register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  try {
    let user;
    
    if (isMongoConnected()) {
      // Try MongoDB first
      const userExists = await User.findOne({ email });
      if (userExists) {
        return next(new ErrorResponse('Email already exists', 400));
      }
      user = await User.create({ name, email, password, role });
    } else {
      // Fallback to in-memory
      user = await createInMemoryUser({ name, email, password, role });
      trackUserRegistered();
    }

    // Generate OTP
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Save OTP to user
    if (isMongoConnected()) {
      await User.findByIdAndUpdate(user._id, { otp, otpExpires });
    } else {
      updateInMemoryUser(user._id, { otp, otpExpires });
    }

    // Send OTP email (try/catch so registration doesn't fail if email fails)
    try {
      await sendEmail({
        email: user.email,
        subject: 'FounderLink AI - Email Verification OTP',
        message: `Hi ${user.name},\n\nYour OTP for email verification is: ${otp}\n\nThis OTP will expire in 10 minutes.\n\nIf you didn't request this, please ignore this email.`,
      });
      console.log(`OTP sent to ${user.email}`);
    } catch (emailError) {
      console.error(`Error sending OTP email: ${emailError.message}`);
    }

    // Return response with user (but not logged in yet - need OTP verification)
    const userWithoutPassword = {
      _id: user._id || user.id,
      id: user._id || user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      profileImage: user.profileImage,
      isVerified: user.isVerified,
    };

    res.status(201).json({
      success: true,
      message: 'OTP sent to your email for verification',
      user: userWithoutPassword,
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  try {
    let user;
    let isMatch = false;

    if (isMongoConnected()) {
      user = await User.findOne({ email }).select('+password');
      if (user) {
        isMatch = await user.matchPassword(password);
      }
    } else {
      user = findInMemoryUserByEmail(email);
      if (user) {
        const bcrypt = require('bcryptjs');
        isMatch = await bcrypt.compare(password, user.password);
      }
    }

    if (!user || !isMatch) {
      return next(new ErrorResponse('Invalid credentials', 401));
    }

    sendTokenResponse(user, 200, res);
  } catch (error) {
    next(error);
  }
});

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
const getMe = asyncHandler(async (req, res, next) => {
  try {
    let user;

    if (isMongoConnected()) {
      user = await User.findById(req.user.id);
    } else {
      user = findInMemoryUserById(req.user.id);
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Forgot password
// @route   POST /api/auth/forgot-password
// @access  Public
const forgotPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  let user;
  if (isMongoConnected()) {
    user = await User.findOne({ email });
  } else {
    user = findInMemoryUserByEmail(email);
  }

  if (!user) {
    return next(new ErrorResponse('There is no user with that email', 404));
  }

  // Generate reset token (in real scenario, send via email)
  const resetToken = crypto.randomBytes(20).toString('hex');

  res.status(200).json({
    success: true,
    data: { resetToken, message: 'Reset token sent (demo only)' },
  });
});

// @desc    Reset password
// @route   PUT /api/auth/reset-password/:token
// @access  Public
const resetPassword = asyncHandler(async (req, res, next) => {
  // For demo purposes, just return success
  res.status(200).json({
    success: true,
    data: { message: 'Password reset (demo only)' },
  });
});

// @desc    Verify email
// @route   GET /api/auth/verify-email/:token
// @access  Public
const verifyEmail = asyncHandler(async (req, res, next) => {
  // For demo purposes, just return success
  res.status(200).json({
    success: true,
    data: { message: 'Email verified (demo only)' },
  });
});

// Helper function to send token response
const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken 
    ? user.getSignedJwtToken() 
    : generateToken(user._id || user.id);

  // Set cookie expiration to 30 days
  const options = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  // Sanitize user object
  const userWithoutPassword = {
    _id: user._id || user.id,
    id: user._id || user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    profileImage: user.profileImage,
    isVerified: user.isVerified,
  };

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token,
    user: userWithoutPassword,
  });
};

// @desc    Verify OTP
// @route   POST /api/auth/verify-otp
// @access  Public
const verifyOTP = asyncHandler(async (req, res, next) => {
  const { email, otp } = req.body;

  try {
    let user;

    if (isMongoConnected()) {
      user = await User.findOne({ email });
    } else {
      user = findInMemoryUserByEmail(email);
    }

    if (!user) {
      return next(new ErrorResponse('User not found', 404));
    }

    // Check OTP
    if (!user.otp || user.otp !== otp) {
      return next(new ErrorResponse('Invalid OTP', 400));
    }

    // Check OTP expiration
    if (new Date() > user.otpExpires) {
      return next(new ErrorResponse('OTP expired', 400));
    }

    // Update user: mark as verified, clear OTP fields
    if (isMongoConnected()) {
      user = await User.findByIdAndUpdate(user._id, { isVerified: true, otp: undefined, otpExpires: undefined }, { new: true });
    } else {
      user = updateInMemoryUser(user._id, { isVerified: true, otp: null, otpExpires: null });
    }

    // Send welcome email (try/catch so login doesn't fail if email fails)
    try {
      await sendEmail({
        email: user.email,
        subject: 'Welcome to FounderLink AI! 🚀',
        message: `Hi ${user.name},

Welcome to FounderLink AI! We're excited to have you on board.

Your account has been successfully verified, and you can now start using all our features to build smarter startups faster!

Here are a few things you can do:
✅ Validate your startup idea
✅ Find a co-founder
✅ Analyze your market
✅ Get AI-powered recommendations

If you have any questions, feel free to reach out to us at support@founderlink.ai.

Best regards,
The FounderLink Team`,
      });
      console.log(`Welcome email sent to ${user.email}`);
    } catch (emailError) {
      console.error(`Error sending welcome email: ${emailError.message}`);
    }

    // Now log the user in
    sendTokenResponse(user, 200, res);
  } catch (error) {
    next(error);
  }
});

// @desc    Resend OTP
// @route   POST /api/auth/resend-otp
// @access  Public
const resendOTP = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  try {
    let user;

    if (isMongoConnected()) {
      user = await User.findOne({ email });
    } else {
      user = findInMemoryUserByEmail(email);
    }

    if (!user) {
      return next(new ErrorResponse('User not found', 404));
    }

    // Generate new OTP
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Save new OTP to user
    if (isMongoConnected()) {
      await User.findByIdAndUpdate(user._id, { otp, otpExpires });
    } else {
      updateInMemoryUser(user._id, { otp, otpExpires });
    }

    // Send new OTP email (try/catch so it doesn't fail)
    try {
      await sendEmail({
        email: user.email,
        subject: 'FounderLink AI - New Email Verification OTP',
        message: `Hi ${user.name},\n\nYour new OTP for email verification is: ${otp}\n\nThis OTP will expire in 10 minutes.\n\nIf you didn't request this, please ignore this email.`,
      });
      console.log(`OTP resent to ${user.email}`);
    } catch (emailError) {
      console.error(`Error resending OTP email: ${emailError.message}`);
    }

    res.status(200).json({
      success: true,
      message: 'OTP resent to your email',
    });
  } catch (error) {
    next(error);
  }
});

// Google OAuth
const googleAuth = asyncHandler(async (req, res, next) => {
  const { code } = req.body;
  if (!code) {
    return next(new ErrorResponse('Code is required', 400));
  }

  try {
    // Exchange code for tokens
    const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
      code,
      client_id: process.env.GOOGLE_CLIENT_ID || 'google-client-id',
      client_secret: process.env.GOOGLE_CLIENT_SECRET || 'google-client-secret',
      redirect_uri: 'http://localhost:5174',
      grant_type: 'authorization_code',
    });

    const { access_token } = tokenResponse.data;

    // Get user info
    const userResponse = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    const { id, email, name, picture } = userResponse.data;

    // Find or create user
    let user;
    if (isMongoConnected()) {
      user = await User.findOne({
        $or: [{ googleId: id }, { email }],
      });

      if (!user) {
        user = await User.create({
          googleId: id,
          email,
          name,
          profileImage: picture,
          isVerified: true,
          role: 'Founder',
        });
      } else {
        if (!user.googleId) {
          user.googleId = id;
          user.isVerified = true;
          if (picture && !user.profileImage) {
            user.profileImage = picture;
          }
          await user.save();
        }
      }
    } else {
      user = findInMemoryUserByEmail(email);
      if (!user) {
        user = createInMemoryUser({
          googleId: id,
          email,
          name,
          profileImage: picture,
          isVerified: true,
          role: 'Founder',
        });
        trackUserRegistered();
      } else {
        if (!user.googleId) {
          user = updateInMemoryUser(user._id || user.id, {
            googleId: id,
            isVerified: true,
            profileImage: picture || user.profileImage,
          });
        }
      }
    }

    sendTokenResponse(user, 200, res);
  } catch (error) {
    console.error('Google OAuth error:', error.response?.data || error.message);
    return next(new ErrorResponse('Google authentication failed', 401));
  }
});

// GitHub OAuth
const githubAuth = asyncHandler(async (req, res, next) => {
  const { code } = req.body;
  if (!code) {
    return next(new ErrorResponse('Code is required', 400));
  }

  try {
    // Exchange code for tokens
    const tokenResponse = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        code,
        client_id: process.env.GITHUB_CLIENT_ID || 'github-client-id',
        client_secret: process.env.GITHUB_CLIENT_SECRET || 'github-client-secret',
        redirect_uri: 'http://localhost:5174',
      },
      {
        headers: { Accept: 'application/json' },
      }
    );

    const { access_token } = tokenResponse.data;

    // Get user info
    const userResponse = await axios.get('https://api.github.com/user', {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    const { id, login, email, name, avatar_url } = userResponse.data;

    // Get email if not provided (GitHub doesn't always include it)
    let userEmail = email;
    if (!userEmail) {
      const emailsResponse = await axios.get('https://api.github.com/user/emails', {
        headers: { Authorization: `Bearer ${access_token}` },
      });
      const primaryEmail = emailsResponse.data.find((e) => e.primary && e.verified);
      userEmail = primaryEmail?.email || `${login}@users.noreply.github.com`;
    }

    // Find or create user
    let user;
    if (isMongoConnected()) {
      user = await User.findOne({
        $or: [{ githubId: id }, { email: userEmail }],
      });

      if (!user) {
        user = await User.create({
          githubId: id,
          email: userEmail,
          name: name || login,
          profileImage: avatar_url,
          isVerified: true,
          role: 'Founder',
        });
      } else {
        if (!user.githubId) {
          user.githubId = id;
          user.isVerified = true;
          if (avatar_url && !user.profileImage) {
            user.profileImage = avatar_url;
          }
          await user.save();
        }
      }
    } else {
      user = findInMemoryUserByEmail(userEmail);
      if (!user) {
        user = createInMemoryUser({
          githubId: id,
          email: userEmail,
          name: name || login,
          profileImage: avatar_url,
          isVerified: true,
          role: 'Founder',
        });
        trackUserRegistered();
      } else {
        if (!user.githubId) {
          user = updateInMemoryUser(user._id || user.id, {
            githubId: id,
            isVerified: true,
            profileImage: avatar_url || user.profileImage,
          });
        }
      }
    }

    sendTokenResponse(user, 200, res);
  } catch (error) {
    console.error('GitHub OAuth error:', error.response?.data || error.message);
    return next(new ErrorResponse('GitHub authentication failed', 401));
  }
});

module.exports = { 
  register, 
  login, 
  getMe, 
  forgotPassword, 
  resetPassword, 
  verifyEmail,
  verifyOTP,
  resendOTP,
  googleAuth,
  githubAuth
};
