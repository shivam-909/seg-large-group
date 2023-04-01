import Notification from "../models/notification";
import DB from "./db";
import * as usersdb from "./users";

export async function CreateNotification(db: DB, notification: Notification): Promise<Notification> {
  const docRef = db.NotificationCollection().doc(notification.id);
  let user;

  try {
    await docRef.set({
      ...notification,
      id: notification.id,
    },);
  } catch (err) {
    throw err;
  }

  user = await usersdb.RetrieveFullUserByID(db, notification.userID)

  if (user == null) {
    throw new Error("user is null")
  }

  user.notifications.push(notification.id)
  await usersdb.UpdateUser(db, user.userID, { notifications: user.notifications });
  return notification;
}

export async function RetrieveNotification(db: DB, id: string): Promise<Notification | null> {
  const docRef = db.NotificationCollection().doc(id);
  const doc = await docRef.get();

  return doc.data() as Notification;
}

export async function GetAllUserNotifs(db: DB, id: string): Promise<Notification[]> {
  const snapshot = await db.NotificationCollection().where('userID', '==', id).get();
  const userNotifs: Notification[] = [];

  snapshot.forEach(doc => {
    const notification = doc.data();
    userNotifs.push(notification);
  });

  return userNotifs;
}

export async function DeleteNotification(db: DB, id: string) {
  const docRef = db.NotificationCollection().doc(id);
  await docRef.delete();
}
