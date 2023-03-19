import DB from "../../../db/db";
import * as errors from "../../public";




export async function AddListing(db: DB, body: any): Promise<void> {
    const { title, compensation, description, location, type, schedule, companyID, industry, coverLetterRequired, urgent, qualifications, datePosted, benefits, requirements, screeningQuestions} = body;
    if(description.length < 800){
        throw new Error(errors.ErrorJobDescriptionTooShort);
    }
    if(description.length > 2000){
        throw new Error(errors.ErrorJobDescriptionTooLong);
    }
}
export async function UpdateListing(db: DB, req: any): Promise<void> {
    const { title, compensation, description, location, type, schedule, companyID, industry, coverLetterRequired, urgent, qualifications, datePosted, benefits, requirements, screeningQuestions} = req;
    if(description.length < 800){
        throw new Error(errors.ErrorJobDescriptionTooShort);
    }
    if(description.length > 2000){
        throw new Error(errors.ErrorJobDescriptionTooLong);
    }
}