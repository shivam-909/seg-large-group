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

export const TestError = "test error";

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
export const ErrorStatusRequired = "no status provided";
export const ErrorMissingProperty = "no property provided for update";
export const ErrorApplicationCouldNotBeCreated = "application could not be created";
export const ErrorNotifCouldNotBeCreated = "notification could not be created";
export const ErrorNoMatchingListings = "no matching job listings found";
export const ErrorNotifCouldNotBeUpdated = "notification could not be updated";
export const ErrorSearchQueryRequired = "no search query provided";
export const ErrorNoCompanyOrSearcherID = "no company or searcher id provided";
export const ErrorJobDescriptionTooShort = "job description is too short";
export const ErrorJobDescriptionTooLong = "job description is too long";
export const ErrorInvalidUserType = "invalid user type";
export const ErrorTitleRequired = "no title is provided";
export const ErrorCompensationRequired = "no compensation is provided";
export const ErrorDescriptionRequired = "no description is provided";
export const ErrorLocationRequired = "no location is provided";
export const ErrorTypeRequired = "no type is provided";
export const ErrorScheduleRequired = "no schedule is provided";
export const ErrorCompanyIDRequired = "no company id is provided";
export const ErrorIndustryRequired = "no industry is provided";
export const ErrorCoverLetterRequired = "no value for coverLetterRequired is provided";
export const ErrorUrgentRequired = "no value for urgent is provided";
export const ErrorQualificationsRequired = "no qualifications are provided";
export const ErrorDatePostedRequired = "no value for date posted is provided";
export const ErrorMissingID = "no searcherID or companyID is provided ";
export const ErrorContentRequired = "no content is provided";
export const ErrorApplicationIDRequired = "no applicationID is provided";
export const ErrorCreatedRequired = "created field is not provided";
export const ErrorUserIDRequired = "no user ID is provided";
export const ErrorQueryRequired = "query string is required";
export const ErrorFailedToCreateListing = "failed to create job listing";
export const ErrorCvRequired = 'cv is required';
export const ErrorMissingCoverLetter = 'no value for cover letter is provided';
export const ErrorMissingQnAs = 'no value for QnAs provided';
export const ErrorInvalidSearcherFields = "cannot update fields for searcher that belong to company";
export const ErrorInvalidCompanyFields = "cannot update fields for company that belong t searcher";



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
        [ErrorStatusRequired, 400],
        [ErrorMissingProperty, 400],
        [ErrorApplicationCouldNotBeCreated, 500],
        [ErrorNotifCouldNotBeCreated, 500],
        [ErrorNoMatchingListings, 404],
        [ErrorNotifCouldNotBeUpdated, 500],
        [ErrorSearchQueryRequired, 400],
        [ErrorNoCompanyOrSearcherID, 400],
        [ErrorJobDescriptionTooShort, 400],
        [ErrorJobDescriptionTooLong, 400],
        [ErrorJobListingNotFound, 404],
        [ErrorTitleRequired, 400],
        [ErrorCompensationRequired, 400],
        [ErrorDescriptionRequired, 400],
        [ErrorLocationRequired, 400],
        [ErrorTypeRequired, 400],
        [ErrorScheduleRequired, 400],
        [ErrorCompanyIDRequired, 400],
        [ErrorIndustryRequired, 400],
        [ErrorCoverLetterRequired, 400],
        [ErrorUrgentRequired, 400],
        [ErrorQualificationsRequired, 400],
        [ErrorDatePostedRequired, 400],
        [ErrorMissingID, 400],
        [ErrorContentRequired, 400],
        [ErrorApplicationIDRequired, 400],
        [ErrorCreatedRequired, 400],
        [ErrorUserIDRequired, 400],
        [ErrorQueryRequired, 400],
        [ErrorCvRequired, 400],
        [ErrorMissingQnAs, 400],
        [ErrorInvalidSearcherFields, 400],
        [ErrorInvalidCompanyFields, 400]

    ]
);