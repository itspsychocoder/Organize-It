
import User from "@/models/User";
import { verifyToken } from "@/utils/jwt";
import { NextApiRequest, NextApiResponse } from 'next';
const verify = async (req:NextApiRequest, res:NextApiResponse) => {
    if (req.method == "POST") {

        const verification = verifyToken(req.body.token, process.env.JWT_TOKEN);
        if (!verification) {
            return res.status(200).json({ type: "error", message: "Invalid Token" })
        }
        const user = await User.findOne({ username: verification.username }, { password: 0, createdAt: 0, updatedAt: 0, __v: 0 });
      
        res.status(200).json({ type: "success", message: "Logged in Sucess", user: user});

    }
    
    else {
        return res.status(200).json({ error: "Not Allowed" })
    }
}

export default verify;
