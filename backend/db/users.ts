import { Firestore } from "firebase-admin/firestore";
import User from "../models/user";
import DB from "./db";

export function CreateUser(db: DB, user: User) {
    const docRef = db.UserCollection().doc(user.id);

    docRef.set({
        'id': user.id,
    });
}

export async function RetrieveUser(db: DB, id: string): Promise<User | null> {

    const docRef = db.UserCollection().doc(id);
    const snapshot = await docRef.get();

    if (snapshot.exists) {
        return snapshot.data()!;
    }

    return null
}

export function UpdateUser(db: DB, user: User) {
    const docRef = db.UserCollection().doc(user.id);

    docRef.update({
        'id': user.id,
    });
}

export function DeleteUser(db: DB, id: string) {
    const docRef = db.UserCollection().doc(id);

    docRef.delete();
}