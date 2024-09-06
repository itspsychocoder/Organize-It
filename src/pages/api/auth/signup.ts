
import bcrypt from 'bcryptjs';
import User from "@/models/User";
import connectDB from '@/middlewares/connectDB';
import { NextApiRequest, NextApiResponse } from 'next';

const signupHandler = async (req:NextApiRequest, res:NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { email, password, firstName, lastName } = req.body;

  const user = await User.findOne({email: email})

  if (user) {
    return res.status(400).json({message: "User already exists", type: "error"})
  }

  else {



    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

        let user = new User({
            email: email,
            firstName: firstName,
            lastName: lastName,
            password: hashedPassword
        })
    
        await user.save();
      res.status(201).json({ message: 'Account created successfully' });
    }
};

export default connectDB(signupHandler);