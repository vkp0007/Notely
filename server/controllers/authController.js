import { User } from '../models/user.model.js';
import generateToken from '../util/generateToken.js';
import bcrypt from 'bcrypt';
import { SECURITY_QUESTIONS } from "../models/user.model.js";

const registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      securityQuestionId,
      securityAnswer
    } = req.body;

    if (!name || !email || !password || !securityQuestionId || !securityAnswer) {
      return res.status(400).json({
        message: "All fields including security question are required",
      });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 🔐 Hash security answer (case-sensitive)
    const answerHash = await bcrypt.hash(securityAnswer.trim(), 10);

    const user = await User.create({
      name,
      email,
      password,
      securityQuestion: {
        questionId: securityQuestionId,
        answerHash,
        attempts: 0,
        lockedUntil: null
      }
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id, user.isAdmin),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const authUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Please enter all the fields" });
        }

        const user = await User.findOne({ email });

        if (user && await user.matchPassword(password)) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id, user.isAdmin),
            });
        } else {
            res.status(401).json({ message: 'Invalid Credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

const updateUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = req.body.password; // model hashes it
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id, updatedUser.isAdmin),
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

const resetPasswordWithSecurityQuestion = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;

    if (!email || !answer || !newPassword) {
      return res.status(400).json({
        message: "Email, answer and new password are required"
      });
    }

    const user = await User.findOne({ email });

    if (!user || !user.securityQuestion) {
      return res.status(404).json({ message: "Invalid recovery details" });
    }

    // ⛔ Lock check
    if (
      user.securityQuestion.lockedUntil &&
      user.securityQuestion.lockedUntil > Date.now()
    ) {
      return res.status(429).json({
        message: "Too many failed attempts. Try again later."
      });
    }

    // 🔐 Verify answer (case-sensitive)
    const isCorrect = await bcrypt.compare(
      answer.trim(),
      user.securityQuestion.answerHash
    );

    if (!isCorrect) {
      user.securityQuestion.attempts += 1;

      if (user.securityQuestion.attempts >= 3) {
        user.securityQuestion.lockedUntil =
          Date.now() + 15 * 60 * 1000; // 15 min
      }

      await user.save();

      return res.status(401).json({
        message: "Incorrect answer"
      });
    }

    // ✅ Answer correct → reset password
    user.password = newPassword; // auto-hashed by schema
    user.securityQuestion.attempts = 0;
    user.securityQuestion.lockedUntil = null;

    await user.save();

    res.json({
      message: "Password reset successfully"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserSecurityQuestion = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });

    if (!user || !user.securityQuestion) {
      return res.status(404).json({ message: "Invalid recovery details" });
    }

    const question = SECURITY_QUESTIONS.find(
      q => q.id === user.securityQuestion.questionId
    );

    res.json({
      question: question.label
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export {
    registerUser,
    authUser,
    getUserProfile,
    updateUserProfile,
   resetPasswordWithSecurityQuestion,
   getUserSecurityQuestion
};
