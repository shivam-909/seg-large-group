import 'express-async-errors';
import { Application, Request, Response } from "express";
import { Handler, HandlerWrapper, TestError } from "../public";

// Route wraps a handler function to provide the database connection.
export function Route(app: Application, handler: HandlerWrapper): Handler {
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

export function StringFromCommaSeparatedList(str: string): string[] {
    str = str.replace(/\s/g, '');
    return str.split(',');
}

export function ParseScreeningQuestions(str: string): Record<string, boolean> {
    str = Buffer.from(str, 'base64').toString('ascii');
    const questions = JSON.parse(str);
    console.log(questions)
    const parsedQuestions: Record<string, boolean> = {};
    // Convert questions to a map of question -> true.
    for (const question of questions) {
        parsedQuestions[Object.keys(question)[0]] = Object.values(question)[0] as boolean;
    }
    return parsedQuestions;
}

async function throwsError() {
    throw new Error(TestError);
}

export async function ErrorTest(req: Request, res: Response) {
    await throwsError();
}