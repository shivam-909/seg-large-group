import DB from "../../../db/db";
import * as errors from "../../public";
import { ValidateCompanyId, ValidateJobListing} from "./checks";
import {ErrorMissingProperty} from "../../public";

function ValidateDescription(description: any){
    if(description.length > 10000){
        throw new Error(errors.ErrorJobDescriptionTooLong);
    }

}

export async function AddListing(db: DB, body: any): Promise<void> {
    const { title, compensation, description, location, type, schedule, companyID, industry, coverLetterRequired, urgent, qualifications, datePosted, benefits, requirements, screeningQuestions} = body;
    if(!title){
        throw new Error(errors.ErrorTitleRequired);
    }

    if(!compensation){
        throw new Error(errors.ErrorCompensationRequired);
    }
    if(!description){
        throw new Error(errors.ErrorDescriptionRequired);
    }
   ValidateDescription(description);
    if(!location){
        throw new Error(errors.ErrorLocationRequired);
    }

    if(!type){
        throw new Error(errors.ErrorTypeRequired);
    }

    if(!schedule){
        throw new Error(errors.ErrorScheduleRequired);
    }

    if(!companyID){
        throw new Error(errors.ErrorCompanyIDRequired);
    }

    if(!industry){
        throw new Error(errors.ErrorIndustryRequired);
    }

    if(!coverLetterRequired){
        throw new Error(errors.ErrorCoverLetterRequired);
    }

    if(!urgent){
        throw new Error(errors.ErrorUrgentRequired);
    }

    if(!qualifications){
        throw new Error(errors.ErrorQualificationsRequired);
    }
    if(!datePosted){
        throw new Error(errors.ErrorDatePostedRequired);
    }

    await ValidateCompanyId(db,companyID);

}

export async function UpdateListing(db: DB, id:string, req: any): Promise<void> {
    await ListingExists(db, id);
    if(req===undefined){
        throw new Error(ErrorMissingProperty);
    }
    const { title, compensation, description, location, type, schedule, companyID, industry, coverLetterRequired, urgent, qualifications, datePosted, benefits, requirements, screeningQuestions} = req;
    await RetrieveListingByFilter(db, req);

}

export async function ListingExists(db: DB, id: string): Promise<void> {
    await ValidateJobListing(db, id);
}

export async function RetrieveListingByFilter(db: DB, body: any): Promise<void> {

    if(body === undefined){
        throw new Error(ErrorMissingProperty);
    }

    const { title, compensation, description, location, type, schedule, companyID, industry, coverLetterRequired, urgent, qualifications, datePosted, benefits, requirements, screeningQuestions} = body;
    if(!title && !compensation && !description && !location && !type && !schedule && !companyID && !industry && !coverLetterRequired && !urgent && !qualifications && !datePosted && !benefits && !requirements && !screeningQuestions){
        throw new Error(errors.ErrorMissingProperty);
    }

    if (description) {
        ValidateDescription(description);
    }

}