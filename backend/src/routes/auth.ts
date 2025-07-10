import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { signupSchema, loginSchema } from '../utils/validation';
import { protect, AuthRequest } from '../middleware/auth';

const router: express.Router = express.Router();

const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, { expiresIn: '30d' });
};

const setCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  domain: process.env.NODE_ENV === 'production' ? undefined : undefined
};

// Signup
router.post('/signup', async (req, res) => {
  try {
    const validatedData = signupSchema.parse(req.body);
    
    const userExists = await User.findOne({ 
      $or: [{ email: validatedData.email }, { username: validatedData.username }] 
    });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create(validatedData);
    const token = generateToken(user._id as string);

    res.cookie('token', token, setCookieOptions);

    res.status(201).json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message || 'Invalid input' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const validatedData = loginSchema.parse(req.body);
    const { email, password } = validatedData;

    const user = await User.findOne({ email });

    if (user && (await user.comparePassword(password))) {
      const token = generateToken(user._id as string);

      res.cookie('token', token, setCookieOptions);

      res.json({
        success: true,
        user: {
          id: user._id,
          username: user.username,
          email: user.email
        }
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message || 'Invalid input' });
  }
});

// Logout
router.post('/logout', (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0)
  });
  res.json({ success: true, message: 'Logged out successfully' });
});

// Get current user
router.get('/me', protect, (req: AuthRequest, res) => {
  res.json({
    success: true,
    user: {
      id: req.user._id,
      username: req.user.username,
      email: req.user.email
    }
  });
});

export default router;
