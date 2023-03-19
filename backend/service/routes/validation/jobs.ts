import DB from "../../../db/db";
import * as errors from "../../public";
import * as jobsdb from "../../../db/jobs";


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








    if(description.length < 800){
        throw new Error(errors.ErrorJobDescriptionTooShort);
    }
    if(description.length > 2000){
        throw new Error(errors.ErrorJobDescriptionTooLong);
    }
}


export async function UpdateListing(db: DB, id:string, req: any): Promise<void> {
    const { title, compensation, description, location, type, schedule, companyID, industry, coverLetterRequired, urgent, qualifications, datePosted, benefits, requirements, screeningQuestions} = req;

    const jobListing = await jobsdb.RetrieveJobListing(db, id);
    if (!jobListing) {
        throw new Error(errors.ErrorJobListingNotFound);
    }
    if(description.length < 800){
        throw new Error(errors.ErrorJobDescriptionTooShort);
    }
    if(description.length > 2000){
        throw new Error(errors.ErrorJobDescriptionTooLong);
    }
}

export async function ListingExists(db: DB, id: string): Promise<void> {
    const jobListing = await jobsdb.RetrieveJobListing(db, id);
    if (!jobListing) {
        throw new Error(errors.ErrorJobListingNotFound);
    }
}