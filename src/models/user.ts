import * as mongoose from "mongoose";
import {Model} from "mongoose";

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
    },
});

const User: Model<IUser>= mongoose.model<IUser>("User", userSchema);

export default User;
