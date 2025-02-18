import express, { Express, Request, Response } from 'express';
import * as mongoose from "mongoose";
import dotenv from 'dotenv';

import helloRoute from './routes/routes';
dotenv.config();

const PORT: number = Number(process.env.PORT) || 3000;
const DB: string = process.env.MONGO_DB || '';

const app: Express = express();

app.use(helloRoute);

mongoose.connect(DB).then(() => {
    console.log('Connected to MongoDB');
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
