import express, { Express, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import DB from './db/db';
// import { Login, Register, Refresh } from './service/routes/auth';
import multer from 'multer';
import { HealthCheck, Route } from './service/routes/routes';
import { ErrorToCode } from './service/public';
import {addListingRoute,  getListingRoute} from "./service/routes/jobs";
import {seedAllRoute} from "./service/routes/seeder";
import {updateUserRoute, deleteUserRoute, getUserRoute} from "./service/routes/users";

export const db = new DB();

export const run = () => {
    dotenv.config();

    const app: Express = express();
    const port = process.env.PORT || 3000;

    // Routes with upload.none() provided will accept a form.
    const upload = multer();

    app.set('db', db);

    // app.post('/auth/login', upload.none(), Route(app, Login));
    // app.post('/auth/register', upload.none(), Route(app, Register));
    // app.post('/auth/refresh', upload.none(), Route(app, Refresh));

    app.post('/jobs/add', upload.none(), Route(app, addListingRoute));
    app.get('/jobs/:id', Route(app, getListingRoute));

    app.get('/user/:id', Route(app, getUserRoute));
    app.put('/users/:id', upload.none(), Route(app, updateUserRoute));
    app.delete('/user/:id', upload.none(), Route(app, deleteUserRoute));

    app.post('/seed_all', Route(app, seedAllRoute));

    app.get('/', HealthCheck);


    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
        console.error(err.stack);
        const code = ErrorToCode.get(err) || 500;
        res.status(code).json({ message: err || 'internal server error' });
    });

    app.listen(port, () => {
        console.log(`server running on port ${port}`);
    });
}

run();