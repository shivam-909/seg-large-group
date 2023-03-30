import DB from "../../../db/db";
import * as notificationsdb from "../../../db/notifications";
import * as errors from "../../public";
import {ValidateApplicationID, ValidateJobListing, ValidateSearcherId, ValidateUserID} from "./checks";
import {GetApplication} from "../applications";
import {RetrieveApplication} from "../../../db/applications";
import {RetrieveFullUserByID} from "../../../db/users";
import {RetrieveJobListing} from "../../../db/jobs";
import {RetrieveCompanyByID} from "../../../db/companies";

export async function AddNotification(db: DB, body: any): Promise<void> {
    const {content, applicationID, created, userID} = body;

    if (!content) {
        throw new Error(errors.ErrorContentRequired);
    }
    if (!applicationID) {
        throw new Error(errors.ErrorApplicationIDRequired);
    }

    if (!created) {
        throw new Error(errors.ErrorCreatedRequired);
    }

    if (!userID) {
        throw new Error(errors.ErrorUserIDRequired);
    }

    await ValidateUserID(db, userID);
    await ValidateApplicationID(db, applicationID);

}

export async function GetAllUserNotifs(db: DB, id: string, body: any): Promise<void> {
    const { applicationID } = body;
    await ValidateUserID(db, id); // if user exists
    const user = await RetrieveFullUserByID(db, id);
    const application = await RetrieveApplication(db, applicationID);

    if(!application){
        throw new Error(errors.ErrorApplicationNotFound);
    }

    if(user?.searcher) {
        await ValidateJobListing(db, application?.jobListing);
        const jobListing = await RetrieveJobListing(db, application?.jobListing);
        if(!jobListing){
            throw new Error(errors.ErrorJobListingNotFound);
        }
        const company = await RetrieveCompanyByID(db, jobListing.companyID);
        if(!company){
            throw new Error(errors.ErrorCompanyNotFound);
        }
    }

    else if(user?.company){
        await ValidateSearcherId(db, user.searcherID);
    }

}

export async function NotificationExists(db: DB, id: string): Promise<void> {
    const notification = await notificationsdb.RetrieveNotification(db, id);
    if (!notification) {
        throw new Error(errors.ErrorNotifNotFound);
    }
}
