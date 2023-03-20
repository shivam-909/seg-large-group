import DB from "../../../db/db";
import * as errors from "../../public";
import * as jobsdb from "../../../db/jobs";
import * as companiesdb from "../../../db/companies";


export function isStringArray(arr:string[]): boolean{
    for(let i=0; i< arr.length;i++){
        if(typeof arr[i]!== 'string') return false;
    }
    return true
}

function ValidateRequirements(requirements: any){
    if(!(Array.isArray(requirements))){
        throw new Error(errors.ErrorRequirementsMustBeArray);
    }
    if(!isStringArray(requirements)){
        throw new Error(errors.ErrorRequirementsMustBeStringArray);
    }
}

function ValidateBenefits(benefits: any){
    if(!Array.isArray(benefits)){
        throw new Error(errors.ErrorBenefitsPostedMustBeArray);
    }
    if(!isStringArray(benefits)){
        throw new Error(errors.ErrorBenefitsMustBeStringArray);
    }
}

function ValidateCompensation(compensation: any){
    if(!Array.isArray(compensation)){
        throw new Error(errors.ErrorCompensationPostedMustBeArray);
    }
    if(compensation.length!=2){
        throw new Error(errors.ErrorCompensationSize);
    }
    if(!isStringArray(compensation)){
        throw new Error(errors.ErrorCompensationMustBeStringArray);
    }
}

function ValidateDescription(description: any){
    if(description.length < 2000){
        throw new Error(errors.ErrorJobDescriptionTooShort);
    }
    if(description.length > 3000){
        throw new Error(errors.ErrorJobDescriptionTooLong);
    }
    if(typeof description !== 'string'){
        throw new Error(errors.ErrorDescriptionMustBeString);
    }
}

function ValidateType(type: any){
    if(!Array.isArray(type)){
        throw new Error(errors.ErrorTypeMustBeArray);
    }
    if(!isStringArray(type)){
        throw new Error(errors.ErrorTypeMustBeStringArray);
    }
}

function ValidateSchedule(schedule: any){
    if(!Array.isArray(schedule)){
        throw new Error(errors.ErrorScheduleMustBeArray);
    }
    if(!isStringArray(schedule)){
        throw new Error(errors.ErrorScheduleMustBeStringArray);
    }
}

function ValidateQualifications(qualifications:any){
    if(!Array.isArray(qualifications)){
        throw new Error(errors.ErrorQualificationsMustBeArray);
    }
    if(!isStringArray(qualifications)){
        throw new Error(errors.ErrorQualificationsMustBeStringArray);
    }
}

export async function ValidateCompanyId(db:DB, companyID: any){
    if(typeof companyID !== 'string'){
        throw new Error(errors.ErrorCompanyIDMustBeString);
    }
    const company = await companiesdb.RetrieveCompanyByID(db, companyID);
    if(!company){
        throw new Error(errors.ErrorCompanyNotFound);
    }
}

function ValidateScreeningQuestions(screeningQuestions: any){
    if(!(screeningQuestions.constructor == Object)){
        throw new Error(errors.ErrorScreeningQuestionsMustBeDictionary);
    }
    for (const [key, value] of Object.entries(screeningQuestions)) {
        if(typeof key!== 'string' || typeof value!== 'boolean'){
            throw new Error(errors.ErrorScreeningQuestionsIncorrectKeyValues);
        }
    }

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
   ValidateCompensation(compensation);
    if(!description){
        throw new Error(errors.ErrorDescriptionRequired);
    }
   ValidateDescription(description);
    if(!location){
        throw new Error(errors.ErrorLocationRequired);
    }
    if(typeof location !== 'string'){
        throw new Error(errors.ErrorLocationMustBeString)
    }
    if(!type){
        throw new Error(errors.ErrorTypeRequired);
    }
    ValidateType(type);

    if(!schedule){
        throw new Error(errors.ErrorScheduleRequired);
    }
   ValidateSchedule(schedule);
    if(!companyID){
        throw new Error(errors.ErrorCompanyIDRequired);
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
    ValidateQualifications(qualifications);
    if(!datePosted){
        throw new Error(errors.ErrorDatePostedRequired);
    }
    if(!(datePosted instanceof Date)){
        throw new Error(errors.ErrorDatePostedMustBeDate);
    }
    if(benefits){
       ValidateBenefits(benefits);
    }
    if(requirements){
        ValidateRequirements(requirements);
    }
    if(screeningQuestions){
        ValidateScreeningQuestions(screeningQuestions);
    }
    await ValidateCompanyId(db,companyID);

}

export async function UpdateListing(db: DB, id:string, req: any): Promise<void> {
    const { title, compensation, description, location, type, schedule, companyID, industry, coverLetterRequired, urgent, qualifications, datePosted, benefits, requirements, screeningQuestions} = req;
    const jobListing = await jobsdb.RetrieveJobListing(db, id);
    if (!jobListing) {
        throw new Error(errors.ErrorJobListingNotFound);
    }
   await RetrieveListingByFilter(db, req);

}

export async function ListingExists(db: DB, id: string): Promise<void> {
    const jobListing = await jobsdb.RetrieveJobListing(db, id);
    if (!jobListing) {
        throw new Error(errors.ErrorJobListingNotFound);
    }
}

export async function RetrieveListingByFilter(db: DB, body: any): Promise<void> {

    const { title, compensation, description, location, type, schedule, companyID, industry, coverLetterRequired, urgent, qualifications, datePosted, benefits, requirements, screeningQuestions} = body;
    if(!title && !compensation && !description && !location && !type && !schedule && !companyID && !industry && !coverLetterRequired && !urgent && !qualifications && !datePosted && !benefits && !requirements && !screeningQuestions){
        throw new Error(errors.ErrorMissingProperty);
    }

    if(title && typeof title !== 'string'){
        throw new Error(errors.ErrorTitleMustBeString);
    }
    if(compensation){
        ValidateCompensation(compensation);
    }
    if(location && typeof location !== 'string'){
        throw new Error(errors.ErrorLocationMustBeString)
    }
    if(type){
        ValidateType(type);
    }
    if(schedule){
        ValidateSchedule(schedule);
    }
    if(companyID){
        await ValidateCompanyId(db,companyID);
    }
    if(coverLetterRequired && typeof coverLetterRequired !== 'boolean'){
        throw new Error(errors.ErrorCoverLetterRequiredMustBeBoolean);
    }
    if(urgent && typeof urgent !== 'boolean'){
        throw new Error(errors.ErrorUrgentMustBeBoolean);
    }
    if(industry && typeof industry !== 'string'){
        throw new Error(errors.ErrorIndustryMustBeString);
    }
    if (description) {
        ValidateDescription(description);
    }
    if(qualifications){
        ValidateQualifications(qualifications);
    }
    if(datePosted && !(datePosted instanceof Date)){
        throw new Error(errors.ErrorDatePostedMustBeDate);
    }
    if(benefits){
        ValidateBenefits(benefits);
    }
    if(requirements){
        ValidateRequirements(requirements);
    }
    if(screeningQuestions){
        ValidateScreeningQuestions(screeningQuestions);
    }
}