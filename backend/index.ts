import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { HealthCheck, Route } from './routes/utility';
import DB from './db/db';
import { Login, Register, Logout, Refresh } from './routes/auth/auth';

dotenv.config();

const app: Express = express();

const db = new DB();
app.set('db', db);

const port = process.env.PORT || 3000;


app.get('/', HealthCheck);

app.post('/auth/login', Route(app, Login));
app.post('/auth/register', Route(app, Register));
app.post('/auth/logout', Route(app, Logout));
app.post('/auth/refresh', Route(app, Refresh));

app.listen(port, () => {
    console.log(`server running on port ${port}`);
});