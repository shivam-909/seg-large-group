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
export const ErrorJobDescriptionTooShort = "job description is too short";
export const ErrorJobDescriptionTooLong = "job description is too long";
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


export const ErrorTitleMustBeString = "title must be a string";
export const ErrorCompensationPostedMustBeArray = "compensation must be an array";
export const ErrorCompensationSize = "compensation must have two elements exactly";
export const ErrorCompensationMustBeStringArray = "every element in compensation must be a string";
export const ErrorDescriptionMustBeString = "description must be a string";
export const ErrorLocationMustBeString = "location must be a string";
export const ErrorTypeMustBeArray = "type must be an array";
export const ErrorTypeMustBeStringArray = "every element in type must be a string";
export const ErrorScheduleMustBeArray = "schedule must be an array";
export const ErrorScheduleMustBeStringArray = "every element in schedule must be a string";
export const ErrorCompanyIDMustBeString = "companyID must be a string";
export const ErrorIndustryMustBeString = "industry must be a string";
export const ErrorCoverLetterRequiredMustBeBoolean = "value provided for cover letter required must be a boolean";
export const ErrorUrgentMustBeBoolean = "value provided for urgent must be a boolean";
export const ErrorQualificationsMustBeArray = "qualifications must be an array";
export const ErrorQualificationsMustBeStringArray = "every element in qualifications must be a string";
export const ErrorDatePostedMustBeDate = "date posted must be a date";

export const ErrorBenefitsPostedMustBeArray = "benefits must be an array";
export const ErrorBenefitsMustBeStringArray = "every element in benefits must be a string";
export const ErrorRequirementsMustBeArray = "requirements must be an array";
export const ErrorRequirementsMustBeStringArray = "every element in requirements must be a string";
export const ErrorScreeningQuestionsMustBeDictionary = "screening questions must be a dictionary";
export const ErrorScreeningQuestionsIncorrectKeyValues = "incorrect key value pairs in screening questions";

export const ErrorSearcherIDMustBeString = "searcher ID must be a string";
export const ErrorNotificationsMustBeArray = "notifications must be an array";
export const ErrorNotificationsMustBeStringArray = "every element in notifications must be a string";
export const ErrorMissingID = "searcherID or companyID required";
export const ErrorPfpUrlMustBeString = "pfp url must be a string";

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
        [ErrorTitleMustBeString, 400],
        [ErrorCompensationPostedMustBeArray,400],
        [ErrorCompensationSize,400],
        [ErrorCompensationMustBeStringArray,400],
        [ErrorDescriptionMustBeString, 400],
        [ErrorDescriptionMustBeString,400],
        [ErrorLocationMustBeString, 400],
        [ErrorTypeMustBeArray, 400],
        [ErrorTypeMustBeStringArray, 400],
        [ErrorScheduleMustBeArray, 400],
        [ErrorScheduleMustBeStringArray, 400],
        [ErrorCompanyIDMustBeString, 400],
        [ErrorIndustryMustBeString, 400],
        [ErrorCoverLetterRequiredMustBeBoolean, 400],
        [ErrorUrgentMustBeBoolean, 400],
        [ErrorQualificationsMustBeArray, 400],
        [ErrorQualificationsMustBeStringArray, 400],
        [ErrorDatePostedMustBeDate, 400],
        [ErrorBenefitsPostedMustBeArray, 400],
        [ErrorBenefitsMustBeStringArray, 400],
        [ErrorRequirementsMustBeStringArray, 400],
        [ErrorRequirementsMustBeArray, 400],
        [ErrorScreeningQuestionsMustBeDictionary, 400],
        [ErrorScreeningQuestionsIncorrectKeyValues, 400],
        [ErrorSearcherIDMustBeString, 400],
        [ErrorNotificationsMustBeArray, 400],
        [ErrorNotificationsMustBeStringArray, 400],
        [ErrorMissingID, 400],
        [ErrorPfpUrlMustBeString,400]
    ]
);