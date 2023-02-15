import { Application, Request, Response } from 'express';
import DB from '../db/db';

export interface Error {
    message: string;
}

export function getErrorMessage(error: unknown) {
    if (error instanceof Error) return error.message
    return String(error)
}

export type Handler = (req: Request, res: Response) => void;
export type HandlerWrapper = (db: DB) => Handler;