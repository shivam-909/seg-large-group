import Notification from "../models/notification";
import DB from "./db";

export async function createNotification(db: DB, notification: Notification): Promise<Notification> {
    const docRef = db.NotificationCollection().doc(notification.id);

    try {
        await docRef.set({
            ...notification,
            id: notification.id,
        });
    } catch (err) {
        throw err;
    }

    return notification;
}
