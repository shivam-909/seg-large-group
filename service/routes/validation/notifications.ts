import DB from "../../../db/db";
import * as notificationsdb from "../../../db/notifications";
import * as errors from "../../public";
import {ValidateApplicationID, ValidateUserID} from "./checks";

export async function AddNotification(db: DB, body: any): Promise<void> {
    const { content, applicationID, created, userID } = body;

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

    if(typeof content !== 'string' ){
        throw new Error(errors.ErrorContentMustBeString);
    }
    if(!(created instanceof Date)){
        throw new Error(errors.ErrorCreatedMustBeDate);
    }


}

export async function UpdateNotification(db: DB, id:string, req: any): Promise<void> {

    const { content, applicationID, created, userID } = req;

    if (!content && !applicationID && !created && !userID) {
        throw new Error(errors.ErrorMissingProperty);
    }

    if (content && typeof content !== 'string') {
        throw new Error(errors.ErrorContentMustBeString);
    }

    if (created && !(created instanceof Date)) {
        throw new Error(errors.ErrorCreatedMustBeDate);
    }

    if(applicationID){
        await ValidateApplicationID(db, applicationID);
    }

    if(userID){
        await ValidateUserID(db, userID);
    }
}

export async function NotificationExists(db: DB, id: string): Promise<void> {
    const notification = await notificationsdb.RetrieveNotification(db, id);
    if (!notification) {
        throw new Error(errors.ErrorNotifNotFound);
    }
}
