import Notification from "../models/notification";
import DB from "./db";
import {GetUserID, retrieveUserById, updateUser} from "./users";
import {ErrorInvalidEmail} from "../service/public";

export async function createNotification(db: DB, notification: Notification): Promise<Notification> {
    const docRef = db.NotificationCollection().doc(notification.id);
    let user;
    let userID;

    try {
        await docRef.set({
            ...notification,
            id: notification.id,
        });
    } catch (err) {
        throw err;
    }

    if(notification.searcherID) {
        userID = await GetUserID(db, notification.searcherID, "searcher")
    }

    else if(notification.companyID) {
        userID = await GetUserID(db, notification.companyID, "company")

    }

    else{
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


// export async function createNotification(db: DB, notification: Notification): Promise<Notification> {
//     const docRef = db.NotificationCollection().doc(notification.id);
//
//     try {
//         await docRef.set({
//             ...notification,
//             id: notification.id,
//         });
//
//         // Update the user document with the new notification
//         if (notification.type === NotificationType.Company) {
//             const company = await retrieveUserById(db, notification.recipientId);
//             if (company) {
//                 company.notifications.push(notification.id);
//                 await updateUser(db, company);
//             }
//
//
//
//         } else if (notification.type === NotificationType.Searcher) {
//             const searcher = await retrieveUserById(db, notification.recipientId);
//             if (searcher) {
//                 searcher.notifications.push(notification.id);
//                 await updateUser(db, searcher);
//             }
//         }
//     } catch (err) {
//         throw err;
//     }
//
//     return notification;
// }
