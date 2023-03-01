import express, { Express, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import DB from './db/db';
import { Login, Register, Refresh } from './service/routes/auth';
import multer from 'multer';
import { Echo, HealthCheck, Route } from './service/routes/routes';
import { ErrorToCode } from './service/public';
import { AuthMW, ErrorMW } from './service/middleware';

export const db = new DB();

export const run = () => {
    dotenv.config();

    const app: Express = express();
    const port = process.env.PORT || 3000;

    // Routes with upload.none() provided will accept a form.
    const upload = multer();

    app.set('db', db);

    app.get('/', HealthCheck);

    app.post('/auth/login', upload.none(), Route(app, Login));
    app.post('/auth/register', upload.none(), Route(app, Register));
    app.post('/auth/refresh', upload.none(), Route(app, Refresh));

    // Error handling middleware
    app.use(ErrorMW);

    // Authentication middleware
    app.use("/api/*", AuthMW);

    app.post("/api/echo", Echo);

    app.listen(port, () => {
        console.log(`server running on port ${port}`);
    });
}

run();