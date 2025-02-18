import express, { Express, Request, Response, Router } from 'express';

const helloRoute: Router = express.Router();
helloRoute.get("/", (req: Request, res: Response) => {
    res.send('Hello, world!');
})

export default helloRoute;