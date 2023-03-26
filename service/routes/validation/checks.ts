import DB from "../../../db/db";
import * as errors from "../../public";
import * as companiesdb from "../../../db/companies";
import * as searchersdb from "../../../db/searchers";
import * as usersdb from "../../../db/users";
import * as applicationsdb from "../../../db/applications";
import * as jobsdb from "../../../db/jobs";

export function isStringArray(arr:string[]): boolean{

    for(let i=0; i< arr.length;i++){
        if(typeof arr[i]!== 'string') return false;
    }
    return true

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

export async function ValidateJobListing(db:DB, jobListing: any){

    if(typeof jobListing !== 'string'){
        throw new Error(errors.ErrorJobListingMustBeString);
    }
    const job = await jobsdb.RetrieveJobListing(db, jobListing);
    if(!job){
        throw new Error(errors.ErrorCompanyNotFound);
    }
}

export async function ValidateSearcherId(db:DB, searcherID: any){

    if(typeof searcherID !== 'string'){
        throw new Error(errors.ErrorSearcherIDMustBeString);
    }

    const searcher = await searchersdb.RetrieveSearcherByID(db, searcherID);
    if (!searcher) {
        throw new Error(errors.ErrorSearcherNotFound);
    }

}

export async function ValidateUserID(db:DB, userID: any){

    if(typeof userID !== 'string'){
        throw new Error(errors.ErrorUserIDMustBeString);
    }

    const user = await usersdb.RetrieveFullUserByID(db, userID);
    if (!user) {
        throw new Error(errors.ErrorUserNotFound);
    }

}

export async function ValidateApplicationID(db:DB, applicationID: any){
    if(typeof applicationID !== 'string'){
        throw new Error(errors.ErrorApplicationIDMustBeString);
    }

    const application = await applicationsdb.RetrieveApplication(db, applicationID);
    if (!application) {
        throw new Error(errors.ErrorApplicationNotFound);
    }
}