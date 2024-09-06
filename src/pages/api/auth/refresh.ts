import { verifyToken, signToken } from '@/utils/jwt';

const SECRET_KEY = process.env.NEXT_PUBLIC_JWT_SECRET;
const REFRESH_SECRET_KEY = process.env.NEXT_PUBLIC_JWT_REFRESH_SECRET;
import { NextApiRequest, NextApiResponse } from 'next';

const refreshHandler = async (req:NextApiRequest, res:NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ type: "error" , message: 'No refresh token provided' });
  }

  try {
    const decoded = verifyToken(refreshToken, REFRESH_SECRET_KEY);
    const newToken = signToken({ id: decoded.id }, SECRET_KEY, '1h');

    res.status(200).json({ type: "success", message: "Token Refreshed", token: newToken });
  } catch (error) {
    return res.status(401).json({ type: "error", message: 'Invalid refresh token' });
  }
};

export default refreshHandler;