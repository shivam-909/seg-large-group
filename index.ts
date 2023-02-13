import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { HealthCheck, Route } from './routes/utility';
import DB from './db/db';
import { Login, Register, Refresh } from './routes/auth/auth';
import multer from 'multer';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;


const upload = multer();

const db = new DB();
app.set('db', db);

app.get('/', HealthCheck);

app.post('/auth/login', upload.none(), Route(app, Login));
app.post('/auth/register', upload.none(), Route(app, Register));
app.post('/auth/refresh', upload.none(), Route(app, Refresh));

app.listen(port, () => {
    console.log(`server running on port ${port}`);
});