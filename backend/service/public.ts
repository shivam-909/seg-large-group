import { Application, NextFunction, Request, Response } from 'express';
import DB from '../db/db';

export interface Error {
    message: string;
}

export function getErrorMessage(error: any) {
    if ('message' in error) return error.message
    return String(error)
}

export type Handler = (req: Request, res: Response, next: NextFunction) => void;
export type HandlerWrapper = (db: DB) => Handler;

export interface Token {
    username: string,
    type: string,
    exp: number
}

export const ErrorInvalidEmail = "invalid email";
export const ErrorInvalidPassword = "invalid password";
export const ErrorUserExists = "user already exists";
export const ErrorFailedToHashPassword = "failed to hash password";
export const ErrorInvalidCredentials = "invalid credentials";
export const ErrorMissingCompanyName = "company name is required";
export const ErrorMissingFirstName = "first name is required";
export const ErrorMissingLastName = "last name is required";


export var ErrorToCode: Map<string, number> = new Map<string, number>(
    [
        [ErrorInvalidEmail, 400],
        [ErrorInvalidPassword, 400],
        [ErrorUserExists, 400],
        [ErrorFailedToHashPassword, 500],
        [ErrorInvalidCredentials, 403],
        [ErrorMissingCompanyName, 400],
    ]
);