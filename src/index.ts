import express, { Express, Request, Response } from 'express';
import * as mongoose from "mongoose";
import dotenv from 'dotenv';

import authRouter from "./routes/authRouter";

dotenv.config();

const PORT: number = Number(process.env.PORT) || 3000;
const DB: string = process.env.MONGO_DB || '';

const app: Express = express();

// middleware
app.use(express.json());

// routes
app.use(authRouter);

mongoose.connect(DB).then((): void => {
    console.log('Connected to MongoDB');
});

app.listen(PORT, '0.0.0.0', (): void => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
