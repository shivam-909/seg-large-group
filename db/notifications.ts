import Notification from "../models/notification";
import DB from "./db";
import {GetUserID, retrieveUserById, updateUser} from "./users";

export async function createNotification(db: DB, notification: Notification): Promise<Notification> {
    const docRef = db.NotificationCollection().doc(notification.id);
    let user;
    let userID;

    try {
        await docRef.set({
            ...notification,
            id: notification.id,
        }, );
    } catch (err) {
        throw err;
    }

    if(notification.searcherID) {
        userID = await GetUserID(db, notification.searcherID, "searcher")
    } else if(notification.companyID) {
        userID = await GetUserID(db, notification.companyID, "company")

    } else{
        throw Error("User type could not be determined")
    }

    if (userID == null) {
        throw new Error ("Couldn't translate companyID to userID")
    }

    user = await retrieveUserById(db, userID)

    if (user == null) {
        throw new Error("User is null")
    }


    user.notifications.push(notification.id)
    await updateUser(db, user)

    return notification;
}

export async function retrieveNotification(db: DB, id: string): Promise<Notification | null> {
    const docRef = db.NotificationCollection().doc(id);
    const doc = await docRef.get();

    return doc.data() as Notification;
}


export async function updateNotification(db: DB, notification: Notification): Promise<void> {
    const docRef = db.NotificationCollection().doc(notification.id);

    const { id, ...notificationData } = notification;

    try {
        await docRef.update(notificationData);
    } catch (err) {
        throw err;
    }
}

export async function deleteNotification(db: DB, id: string) {
    const docRef = db.NotificationCollection().doc(id);
    await docRef.delete();
}