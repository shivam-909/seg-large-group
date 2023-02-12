import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { HealthCheck } from './routes/utility';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get('/', HealthCheck);

app.listen(port, () => {
    console.log(`server running on port ${port}`);
});