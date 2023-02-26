import express, { Express, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import DB from './db/db';
import { Login, Register, Refresh } from './service/routes/auth';
import { uploadFile } from './service/storage/storage';
import multer from 'multer';
import { HealthCheck, Route } from './service/routes/routes';
import { ErrorToCode } from './service/public';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// Routes with upload.none() provided will accept a form.
const upload = multer();

const db = new DB();
app.set('db', db);

app.get('/', HealthCheck);

app.post('/auth/login', upload.none(), Route(app, Login));
app.post('/auth/register', upload.none(), Route(app, Register));
app.post('/auth/refresh', upload.none(), Route(app, Refresh));

app.post('/storage/upload', upload.none(), Route(app, uploadFile));


app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    const code = ErrorToCode.get(err) || 500;
    res.status(code).json({ message: err || 'internal server error' });
});

app.listen(port, () => {
    console.log(`server running on port ${port}`);
});