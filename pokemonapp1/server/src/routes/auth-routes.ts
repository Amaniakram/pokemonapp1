import { Router, type Request, type Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({
      where: { username },
    });

    if (!user) {
       res.status(401).json({ message: 'Authentication failed' });
    }

    // Compare the provided password with the stored hashed password
    const passwordIsValid = await bcrypt.compare(password, user?.password||"");
    if (!passwordIsValid) {
       res.status(401).json({ message: 'Authentication failed' });
    }

    // Generate a JWT token
    const secretKey = process.env.JWT_SECRET_KEY;
    if (!secretKey) {
      throw new Error('JWT_SECRET_KEY is not defined in environment variables');
    }

    const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
     res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
     res.status(500).json({ message: 'Internal server error' });
  }
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;