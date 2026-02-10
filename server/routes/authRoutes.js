import express from 'express';
const router = express.Router();

import {
  registerUser,
  authUser,
  getUserProfile,
  updateUserProfile,
  resetPasswordWithSecurityQuestion,
  getUserSecurityQuestion
} from '../controllers/authController.js';

import { protect } from '../middlewares/authMiddleware.js';

router.post('/register', registerUser);
router.post('/login', authUser);

router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

// 🔐 Password recovery 
router.get('/password/question', getUserSecurityQuestion);
router.post('/password/reset', resetPasswordWithSecurityQuestion);

export default router;
