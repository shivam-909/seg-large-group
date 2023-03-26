import DB from "../../../db/db";
import * as searchersdb from "../../../db/searchers";
import * as jobsdb from "../../../db/jobs";
import * as applicationsdb from "../../../db/applications";
import * as errors from "../../public";
import {ErrorMissingProperty} from "../../public";

export async function AddApplication(db: DB, body: any): Promise<void> {
    const { status, searcher, jobListing } = body;

    if (!status) {
        throw new Error(errors.ErrorStatusRequired);
    }

    if (!searcher) {
        throw new Error(errors.ErrorSearcherIDRequired);
    }

    const searcherDoc = await searchersdb.RetrieveSearcherByID(db, searcher);
    if (!searcherDoc) {
        throw new Error(errors.ErrorSearcherNotFound);
    }

    if (!jobListing) {
        throw new Error(errors.ErrorJobListingIDRequired);
    }

    const jobListingDoc = await jobsdb.RetrieveJobListing(db, jobListing);
    if (!jobListingDoc) {
        throw new Error(errors.ErrorJobListingNotFound);
    }
}


export async function RetrieveApplicationByFilter(db: DB, body: any): Promise<void> {

    const { status, searcher, jobListing } = body;

    if (!status && !searcher && !jobListing) {
        throw new Error(errors.ErrorMissingFilter);
    }

    if (searcher) {
        const searcherDoc = await searchersdb.RetrieveSearcherByID(db, searcher);
        if (!searcherDoc) {
            throw new Error(errors.ErrorSearcherNotFound);
        }
    }

    if (jobListing) {
        const jobListingDoc = await jobsdb.RetrieveJobListing(db, jobListing);
        if (!jobListingDoc) {
            throw new Error(errors.ErrorJobListingNotFound);
        }
    }
}


export async function UpdateApplication(db: DB, id:string, req: any): Promise<void> {

    if(req===undefined){
        throw new Error(ErrorMissingProperty);
    }

    const { status, searcher, jobListing } = req;

    const applicationDoc = await applicationsdb.RetrieveApplication(db, id);
    if (!applicationDoc) {
        throw new Error(errors.ErrorApplicationNotFound);
    }

    if (!status && !searcher && !jobListing) {
        throw new Error(errors.ErrorMissingProperty);
    }

    if (status && typeof status !== 'string') {
        throw new Error(errors.ErrorStatusMustBeString);
    }

    if (searcher) {
        const searcherDoc = await searchersdb.RetrieveSearcherByID(db, searcher);
        if (!searcherDoc) {
            throw new Error(errors.ErrorSearcherNotFound);
        }
    }

    if (jobListing) {
        const jobListingDoc = await jobsdb.RetrieveJobListing(db, jobListing);
        if (!jobListingDoc) {
            throw new Error(errors.ErrorJobListingNotFound);
        }
    }
}



export async function DeleteApplication(db: DB, id: string): Promise<void> {
    const application = await applicationsdb.RetrieveApplication(db, id);
    if (!application) {
        throw new Error(errors.ErrorApplicationNotFound);
    }
}
