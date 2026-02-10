console.log("AUTH MIDDLEWARE VERSION: SAFE");
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select('-password');
      return next(); // ✅ MUST return
    } catch (error) {
      return res
        .status(401)
        .json({ message: 'Not authorized, token failed' });
    }
  }

  return res
    .status(401)
    .json({ message: 'Not authorized, no token' });
};

const adminOnly = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    return next(); // ✅ MUST return
  }

  return res
    .status(403)
    .json({ message: 'Access denied, admin only' });
};

export { protect, adminOnly };
