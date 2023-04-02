import DB from "../../../db/db";
import * as errors from "../../public";
import * as companiesdb from "../../../db/companies";
import * as searchersdb from "../../../db/searchers";
import * as usersdb from "../../../db/users";
import * as applicationsdb from "../../../db/applications";
import * as jobsdb from "../../../db/jobs";

export async function ValidateCompanyId(db: DB, companyID: any) {

    const company = await companiesdb.RetrieveCompanyByID(db, companyID);
    if (!company) {
        throw new Error(errors.ErrorCompanyNotFound);
    }
}

export async function ValidateJobListing(db: DB, jobListing: any) {
    const job = await jobsdb.RetrieveJobListing(db, jobListing);
    if (!job) {
        console.trace("job not found");
        throw new Error(errors.ErrorCompanyNotFound);
    }
}

export async function ValidateSearcherId(db: DB, searcherID: any) {
    const searcher = await searchersdb.RetrieveSearcherByID(db, searcherID);
    if (!searcher) {
        throw new Error(errors.ErrorSearcherNotFound);
    }

}

export async function ValidateUserID(db: DB, userID: any) {

    const user = await usersdb.RetrieveFullUserByID(db, userID);
    if (!user) {
        throw new Error(errors.ErrorUserNotFound);
    }

}

export async function ValidateApplicationID(db: DB, applicationID: any) {

    const application = await applicationsdb.RetrieveApplication(db, applicationID);
    if (!application) {
        throw new Error(errors.ErrorApplicationNotFound);
    }
}