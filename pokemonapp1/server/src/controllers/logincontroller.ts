import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models';

export const loginUser = async (
  req: { body: { username: any; password: any } },
  res: {
    status: (code: number) => {
      json: (body: { message: string; error?: any }) => void;
    };
    json: (body: { token: string }) => void;
  }
) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Email and password required.' });
  }

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: 'JWT secret not configured.' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ message: 'Login failed', error: err.message });
    } else {
      res.status(500).json({ message: 'Login failed', error: 'Unknown error' });
    }
  }
};
