const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token — secret must match the one used in authController
      const secret = process.env.JWT_SECRET;
      if (!secret) {
        console.error('[authMiddleware] JWT_SECRET is not set in environment!');
        return res.status(500).json({ message: 'Server configuration error' });
      }

      const decoded = jwt.verify(token, secret);

      // Get user from the token, exclude password
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({ message: 'Not authorized, user not found' });
      }

      return next();
    } catch (error) {
      // JsonWebTokenError / TokenExpiredError are expected for stale/bad tokens — don't log them as errors
      if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Not authorized, token invalid or expired' });
      }
      // Truly unexpected errors (DB issues, etc.) should be logged
      console.error('[authMiddleware] Unexpected error:', error.message);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };
