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
    const {content, application, created, userID} = body;
    console.log(application)

    if (!content) {
        throw new Error(errors.ErrorContentRequired);
    }
    if (!application) {
        throw new Error(errors.ErrorApplicationIDRequired);
    }

    if (!created) {
        throw new Error(errors.ErrorCreatedRequired);
    }

    if (!userID) {
        throw new Error(errors.ErrorUserIDRequired);
    }

    await ValidateUserID(db, userID);
    await ValidateApplicationID(db, application);

}

export async function NotificationExists(db: DB, id: string): Promise<void> {
    const notification = await notificationsdb.RetrieveNotification(db, id);
    if (!notification) {
        throw new Error(errors.ErrorNotifNotFound);
    }
}
