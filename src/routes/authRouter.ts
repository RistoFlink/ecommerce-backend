import express, {Router, Request, Response} from "express";
import User from "../models/user";
import bcrypt from 'bcrypt';

const authRouter:Router = express.Router();

authRouter.post('/api/signup', async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, firstName, lastName, password } = req.body;

        const saltRounds: number = 10;
        const hashedPassword: string = await bcrypt.hash(password, saltRounds);

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            res.status(400).json({error: "Email already exists"});
            return;
        }

        const user = new User({
            email,
            firstName,
            lastName,
            password: hashedPassword,
        });

        await user.save();

        res.status(201).send(user);
        return;
    } catch(err) {
        console.error(err);
        res.status(500).json({error: "Failed to sign up"});
        return;
    }
});

export default authRouter;
