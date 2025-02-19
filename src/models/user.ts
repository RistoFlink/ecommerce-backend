import * as mongoose from "mongoose";
import {Model} from "mongoose";
import validator from "validator";

interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    country?: string; // Optional field
    city?: string;    // Optional field
    password: string;
}

const userSchema = new mongoose.Schema<IUser>({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        validate: [
            {
                validator: (email: string) => validator.isEmail(email),
                message: 'Invalid email address',
            },
        ],
    },
    country:{
        type: String,
        default: '',
    },
    city:{
        type: String,
        default: '',
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: (password: string) => validator.isStrongPassword(password),
            message: 'Password is not strong enough',
        },
    },
});

const User: Model<IUser>= mongoose.model<IUser>("User", userSchema);

export default User;
