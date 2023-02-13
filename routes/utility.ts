import { Application, Request, Response } from 'express';
import DB from '../db/db';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/config';
import User from '../models/user';


// Route wraps a handler function to provide the database connection.
export function Route(app: Application,
    handler: (db: DB) =>
        (req: Request, res: Response) => void):
    (req: Request, res: Response) => void {

    const db = app.get('db');

    return handler(db);
}


export function HealthCheck(req: Request, res: Response) {
    res.send('Binary Bandits API');
}

export function ValidPassword(password: string): boolean {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})/;
    return regex.test(password);
}

export function GenerateKeyPair(username: string) {
    const access = GenerateJWT('access', username);
    const refresh = GenerateJWT('refresh', username);

    return {
        access: access,
        refresh: refresh,
    };
}

function GenerateJWT(type: string, username: string): string {
    const payload = {
        type: type,
        username: username,
    };

    const options = {
        expiresIn: '1d',
    };

    if (type === 'access') {
        options.expiresIn = '15m';
    }

    return jwt.sign(payload, JWT_SECRET, options);
}