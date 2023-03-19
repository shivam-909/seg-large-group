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
export const ErrorInvalidRefreshToken = "invalid refresh token";
export const ErrorUserNotFound = "user not found";
export const ErrorJobListingNotFound = "job listing not found";
export const ErrorMultipleUsersFound = "multiple users found";
export const ErrorCompanyNotFound = "company not found";
export const ErrorSearcherNotFound = "searcher not found";
export const ErrorApplicationNotFound = "application not found";
export const ErrorNotifNotFound = "notification not found";
export const ErrorNoCompaniesExist = "no companies exist";
export const ErrorNoSearchersExist = "no searchers exist";
export const ErrorSearcherIDRequired = "no searcher id provided";
export const ErrorJobListingIDRequired = "no joblisting id provided";
export const ErrorMissingFilter = "no filters provided";
export const ErrorStatusMustBeString = "status must be a string";
export const ErrorStatusRequired = "no status provided";
export const ErrorMissingProperty = "no property provided for update";


export var ErrorToCode: Map<string, number> = new Map<string, number>(
    [
        [ErrorInvalidEmail, 400],
        [ErrorInvalidPassword, 400],
        [ErrorUserExists, 400],
        [ErrorFailedToHashPassword, 500],
        [ErrorInvalidCredentials, 403],
        [ErrorMissingCompanyName, 400],
        [ErrorMissingFirstName, 400],
        [ErrorMissingLastName, 400],
        [ErrorInvalidRefreshToken, 403],
        [ErrorUserNotFound, 404],
        [ErrorJobListingNotFound, 404],
        [ErrorMultipleUsersFound, 500],
        [ErrorCompanyNotFound, 404],
        [ErrorSearcherNotFound, 404],
        [ErrorApplicationNotFound, 404],
        [ErrorNotifNotFound, 404],
        [ErrorNoCompaniesExist, 404],
        [ErrorNoSearchersExist, 404],
        [ErrorSearcherIDRequired, 400],
        [ErrorJobListingIDRequired, 400],
        [ErrorMissingFilter, 400],
        [ErrorStatusMustBeString, 400],
        [ErrorStatusRequired, 400],
        [ErrorMissingProperty, 400],
    ]
);