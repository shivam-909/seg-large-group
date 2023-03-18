import {Application, Request, Response} from "express";
import {Handler, HandlerWrapper} from "../public";

// Route wraps a handler function to provide the database connection.
export function Route(app: Application, handler: HandlerWrapper) {
    const db = app.get('db');
    return handler(db);
}

export function HealthCheck(req: Request, res: Response) {
    res.send('Binary Bandits API');
}

export function Echo(req: Request, res: Response) {
    console.log(req.headers)
    return res.status(200).json(req.headers["auth_username"]);
}