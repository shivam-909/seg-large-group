import DB from "../../../db/db";
import * as errors from "../../public";
import * as jobsdb from "../../../db/jobs";
import * as companiesdb from "../../../db/companies";
import * as searchersdb from "../../../db/searchers";


function isStringArray(arr:string[]): boolean{
    for(let i=0; i< arr.length;i++){
        if(typeof arr[i]!== 'string') return false;
    }
    return true
}

export async function AddListing(db: DB, body: any): Promise<void> {
    const { title, compensation, description, location, type, schedule, companyID, industry, coverLetterRequired, urgent, qualifications, datePosted, benefits, requirements, screeningQuestions} = body;
    if(!title){
        throw new Error(errors.ErrorTitleRequired);
    }
    if(typeof title !== 'string'){
        throw new Error(errors.ErrorTitleMustBeString);
    }
    if(!compensation){
        throw new Error(errors.ErrorCompensationRequired);
    }
    if(!Array.isArray(compensation)){
        throw new Error(errors.ErrorCompensationPostedMustBeArray);
    }
    if(compensation.length!=2){
        throw new Error(errors.ErrorCompensationSize);
    }
    if(!isStringArray(compensation)){
        throw new Error(errors.ErrorCompensationMustBeStringArray);
    }
    if(!description){
        throw new Error(errors.ErrorDescriptionRequired);
    }
    if(description.length < 800){
        throw new Error(errors.ErrorJobDescriptionTooShort);
    }
    if(description.length > 2000){
        throw new Error(errors.ErrorJobDescriptionTooLong);
    }
    if(typeof description !== 'string'){
        throw new Error(errors.ErrorDescriptionMustBeString);
    }
    if(!location){
        throw new Error(errors.ErrorLocationRequired);
    }
    if(typeof location !== 'string'){
        throw new Error(errors.ErrorLocationMustBeString)
    }
    if(!type){
        throw new Error(errors.ErrorTypeRequired);
    }
    if(!Array.isArray(type)){
        throw new Error(errors.ErrorTypeMustBeArray);
    }
    if(!isStringArray(type)){
        throw new Error(errors.ErrorTypeMustBeStringArray);
    }

    if(!schedule){
        throw new Error(errors.ErrorScheduleRequired);
    }
    if(!Array.isArray(schedule)){
        throw new Error(errors.ErrorScheduleMustBeArray);
    }
    if(!isStringArray(schedule)){
        throw new Error(errors.ErrorScheduleMustBeStringArray);
    }

    if(!companyID){
        throw new Error(errors.ErrorCompanyIDRequired);
    }
    if(typeof companyID !== 'string'){
        throw new Error(errors.ErrorCompanyIDMustBeString);
    }
    if(!industry){
        throw new Error(errors.ErrorIndustryRequired);
    }
    if(typeof industry !== 'string'){
        throw new Error(errors.ErrorIndustryMustBeString);
    }
    if(!coverLetterRequired){
        throw new Error(errors.ErrorCoverLetterRequired);
    }
    if(typeof coverLetterRequired !== 'boolean'){
        throw new Error(errors.ErrorCoverLetterRequiredMustBeBoolean);
    }
    if(!urgent){
        throw new Error(errors.ErrorUrgentRequired);
    }
    if(typeof urgent !== 'boolean'){
        throw new Error(errors.ErrorUrgentMustBeBoolean);
    }
    if(!qualifications){
        throw new Error(errors.ErrorQualificationsRequired);
    }
    if(!Array.isArray(qualifications)){
        throw new Error(errors.ErrorQualificationsMustBeArray);
    }
    if(!isStringArray(qualifications)){
        throw new Error(errors.ErrorQualificationsMustBeStringArray);
    }
    if(!datePosted){
        throw new Error(errors.ErrorDatePostedRequired);
    }
    if(!(datePosted instanceof Date)){
        throw new Error(errors.ErrorDatePostedMustBeDate);
    }
    const company = await companiesdb.RetrieveCompanyByID(db, companyID);
    if(!company){
        throw new Error(errors.ErrorCompanyNotFound);
    }


}

export async function UpdateListing(db: DB, id:string, req: any): Promise<void> {
    const { title, compensation, description, location, type, schedule, companyID, industry, coverLetterRequired, urgent, qualifications, datePosted, benefits, requirements, screeningQuestions} = req;

    const jobListing = await jobsdb.RetrieveJobListing(db, id);
    if (!jobListing) {
        throw new Error(errors.ErrorJobListingNotFound);
    }
    if(companyID){
        const company = await companiesdb.RetrieveCompanyByID(db, companyID);
        if(!company){
            throw new Error(errors.ErrorCompanyNotFound);
        }
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
export async function RetrieveListingByFilter(db: DB, body: any): Promise<void> {

    const { title, compensation, description, location, type, schedule, companyID, industry, coverLetterRequired, urgent, qualifications, datePosted, benefits, requirements, screeningQuestions} = body;

    //add code to check that param for filter has been passed
    if(companyID){
        const company = await companiesdb.RetrieveCompanyByID(db, companyID);
        if(!company){
            throw new Error(errors.ErrorCompanyNotFound);
        }
    }
}