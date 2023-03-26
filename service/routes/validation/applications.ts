import DB from "../../../db/db";
import * as searchersdb from "../../../db/searchers";
import * as jobsdb from "../../../db/jobs";
import * as applicationsdb from "../../../db/applications";
import * as errors from "../../public";
import {ValidateApplicationID, ValidateJobListing, ValidateSearcherId} from "./checks";

export async function AddApplication(db: DB, body: any): Promise<void> {

    if(body === undefined){
        throw new Error(errors.ErrorMissingProperty);
    }

    const { status, searcher, jobListing } = body;

    if (!status) {
        throw new Error(errors.ErrorStatusRequired);
    }

    if(typeof status !== 'string'){
        throw new Error(errors.ErrorStatusMustBeString);
    }

    if (!searcher) {
        throw new Error(errors.ErrorSearcherIDRequired);
    }

    await ValidateSearcherId(db, searcher);

    if (!jobListing) {
        throw new Error(errors.ErrorJobListingIDRequired);
    }

    await ValidateJobListing(db, jobListing);
}


export async function RetrieveApplicationByFilter(db: DB, body: any): Promise<void> {

    if(body === undefined){
        throw new Error(errors.ErrorMissingProperty);
    }

    const { status, searcher, jobListing } = body;

    if (!status && !searcher && !jobListing) {
        throw new Error(errors.ErrorMissingFilter);
    }

    if(status && typeof status !== 'string'){
        throw new Error(errors.ErrorStatusMustBeString);
    }

    if (searcher) {
        await ValidateSearcherId(db,searcher);
    }

    if (jobListing) {
        await ValidateJobListing(db, jobListing);
    }
}


export async function UpdateApplication(db: DB, id:string, req: any): Promise<void> {

    if(req === undefined){
        throw new Error(errors.ErrorMissingProperty);
    }

    const { status, searcher, jobListing } = req;
    await ValidateApplicationID(db, id)

    if (!status && !searcher && !jobListing) {
        throw new Error(errors.ErrorMissingProperty);
    }

    if (status && typeof status !== 'string') {
        throw new Error(errors.ErrorStatusMustBeString);
    }

    if (searcher) {
        await ValidateSearcherId(db, searcher);
    }

    if (jobListing) {
        await ValidateJobListing(db, jobListing);
    }

}



export async function ApplicationExists(db: DB, id: string): Promise<void> {
    await ValidateApplicationID(db, id);
}