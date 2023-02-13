import { Firestore } from "firebase-admin/firestore";
import User from "../models/user";
import DB from "./db";

export async function CreateUser(db: DB, user: User) {
    const docRef = db.UserCollection().doc(user.username);

    await docRef.set({
        'username': user.username,
        'hashedPassword': user.hashedPassword,
        'email': user.email,
    });
}

export async function RetrieveUser(db: DB, username: string): Promise<User | null> {

    const docRef = db.UserCollection().doc(username);
    const snapshot = await docRef.get();

    if (snapshot.exists) {
        return snapshot.data()!;
    }

    return null
}

export function UpdateUser(db: DB, user: User) {
    const docRef = db.UserCollection().doc(user.username);

    docRef.update({
        'username': user.username,
    });
}

export function DeleteUser(db: DB, username: string) {
    const docRef = db.UserCollection().doc(username);

    docRef.delete();
}