import { Application, Request, Response } from 'express';
import DB from '../db/db';

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

