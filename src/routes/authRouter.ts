import express, {Router, Request, Response} from "express";
import User from "../models/user";
import bcrypt from 'bcrypt';
import jwt, {JwtPayload} from 'jsonwebtoken';

const authRouter: Router = express.Router();

authRouter.post('/api/signup', async (req: Request, res: Response): Promise<void> => {
    try {
        const {email, firstName, lastName, password} = req.body;

        const saltRounds: number = 10;
        const hashedPassword: string = await bcrypt.hash(password, saltRounds);

        const existingUser = await User.findOne({email});

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
    } catch (err) {
        console.error(err);
        res.status(500).json({error: "Failed to sign up"});
        return;
    }
});

authRouter.post('/api/login', async (req: Request, res: Response): Promise<void> => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});

        if (!user) {
            res.status(401).json({error: "Incorrect username or password"});
            return;
        }

        const passwordMatches: boolean = await bcrypt.compare(password, user.password);
        if (!passwordMatches) {
            res.status(401).json({error: "Incorrect username or password"});
            return
        }

        const secretKey: string = process.env.JWT_SECRET_KEY || 'suchastrongandsecretkey';
        const token: string = jwt.sign({id: user._id}, secretKey, {expiresIn: '1h'});

        res.cookie('jwt', token, {httpOnly: true, secure: true})

        res.status(200).json({
            message: "Successfully logged in", user: {
                id: user._id,
                email: user.email,
            }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({error: "Failed to log in"});
        return;
    }
})

export default authRouter;
