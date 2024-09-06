import bcrypt from 'bcryptjs';
import { signToken } from '@/utils/jwt';
import User from '@/models/User';
import connectDB from '@/middlewares/connectDB';
const SECRET_KEY = process.env.NEXT_PUBLIC_JWT_SECRET;
const REFRESH_SECRET_KEY = process.env.NEXT_PUBLIC_JWT_REFRESH_SECRET;
import { NextApiRequest, NextApiResponse } from 'next';
const loginHandler = async (req:NextApiRequest, res:NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { email,password } = req.body;
  const user = await User.findOne({email: email})

  if (!user) {
    return res.status(401).json({ type: "error",message: 'Invalid username or Password' });
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    return res.status(401).json({ type: "error", message: 'Invalid username or Password' });
  }

  const token = signToken({ username: user.username }, SECRET_KEY, '1h');
  const refreshToken = signToken({ username: user.username }, REFRESH_SECRET_KEY, '7d');

  res.status(200).json({ type: "success", message: "Logged in Sucess", token: token, refreshToken: refreshToken });
};

export default connectDB(loginHandler);