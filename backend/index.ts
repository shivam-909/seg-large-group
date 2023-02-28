import express, { Express, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import DB from './db/db';
import multer from 'multer';
import { HealthCheck, Route } from './service/routes/routes';
import { ErrorToCode } from './service/public';
import {addListingRoute, deleteListingRoute, getListingRoute} from "./service/routes/jobs";
import {seedAllRoute} from "./service/routes/seeder";
import {updateUserRoute, deleteUserRoute, getUserRoute} from "./service/routes/users";
import {Login, Refresh, Register} from "./service/routes/auth";
import {AddApplication, SeedApplications, GetApplication} from "./service/routes/applications";


export const db = new DB();

export const run = () => {
    dotenv.config();

    const app: Express = express();
    const port = process.env.PORT || 8000;

    // Routes with upload.none() provided will accept a form.
    const upload = multer();

    app.set('db', db);

    app.post('/auth/login', upload.none(), Route(app, Login));
    app.post('/auth/register', upload.none(), Route(app, Register));
    app.post('/auth/refresh', upload.none(), Route(app, Refresh));

    app.post('/jobs/add', upload.none(), Route(app, addListingRoute));
    app.get('/jobs/:id', Route(app, getListingRoute));
    app.delete('/jobs/:id', upload.none(), Route(app, deleteListingRoute));

    app.post('/applications/seed', Route(app, SeedApplications));
    app.post('/applications/add', upload.none(), Route(app, AddApplication));
    app.get('/applications/:id', Route(app, GetApplication));

    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    const code = ErrorToCode.get(err) || 500;
    res.status(code).json({ message: err || 'internal server error' });
});

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