import DB from "../../../db/db";
import * as errors from "../../public";
import {ValidateApplicationID, ValidateJobListing, ValidateSearcherId} from "./checks";
import {RetrieveJobListing} from "../../../db/jobs";

export async function AddApplication(db: DB, body: any): Promise<void> {

    if(body === undefined){
        throw new Error(errors.ErrorMissingProperty);
    }

    const { status, searcher, jobListing, cv, coverLetter, QnAs } = body;

    if (!status) {
        throw new Error(errors.ErrorStatusRequired);
    }

    if (!searcher) {
        throw new Error(errors.ErrorSearcherIDRequired);
    }

    if (!jobListing) {
        throw new Error(errors.ErrorJobListingIDRequired);
    }

    await ValidateJobListing(db, jobListing);

    if(!cv){
        throw new Error(errors.ErrorCvRequired);
    }
    const job = await RetrieveJobListing(db, jobListing);

    if(job) {
        if (!coverLetter && job.coverLetterRequired) {
            throw new Error(errors.ErrorMissingCoverLetter);
        }
    }

    if(!QnAs){
        throw new Error(errors.ErrorMissingQnAs);
    }

    await ValidateSearcherId(db, searcher);


}


export async function RetrieveApplicationByFilter(db: DB, body: any): Promise<void> {

    if(body === undefined){
        throw new Error(errors.ErrorMissingProperty);
    }

    const { status, searcher, jobListing } = body;

    if (!status && !searcher && !jobListing) {
        throw new Error(errors.ErrorMissingFilter);
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

    const { status, searcher, jobListing, cv, coverLetter, QnAs } = req;
    await ValidateApplicationID(db, id)

    if (!status && !searcher && !jobListing && !cv && !coverLetter && !QnAs) {
        throw new Error(errors.ErrorMissingProperty);
    }

    if (searcher) {
        await ValidateSearcherId(db, searcher);
    }

    if (jobListing) {
        await ValidateJobListing(db, jobListing);
    }

}

export async function DeleteApplication(db: DB, id: string): Promise<void> {
    const application = await applicationsdb.RetrieveApplication(db, id);
    if (!application) {
        throw new Error(errors.ErrorApplicationNotFound);
    }
}

export async function ApplicationExists(db: DB, id: string): Promise<void> {
    await ValidateApplicationID(db, id);
}