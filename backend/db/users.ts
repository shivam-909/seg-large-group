import User from "../models/user";
import DB from "./db";
import { Error } from "../service/public";

export async function CreateUser(db: DB, user: User) {
    const docRef = db.UserCollection().doc(user.idField);

    await docRef.set({
        'idField': user.idField,
        'hashedPassword': user.hashedPassword,
        'email': user.email,
    });
}

export async function RetrieveUser(db: DB, id: string): Promise<User | null> {
    const docRef = db.UserCollection().doc(id);
    const doc = await docRef.get();

    if (doc.exists) {
        return doc.data() as User;
    } else {
        return null
    }
}

export async function RetrieveUserByEmail(db: DB, email: string): Promise<User | null> {
    const snapshot = await db.UserCollection().where('email', '==', email).get();

    if (snapshot.empty) {
        console.log("no user with email");
        return null;
    }

    if (snapshot.size > 1) {
        throw {
            message: "multiple users with same email",
        }
    }

    const doc = snapshot.docs[0];
    const user = doc.data() as User;
    return user;
}

export async function UpdateUser(db: DB, user: User): Promise<void> {
    const docRef = db.UserCollection().doc(user.idField);

    try {
        await docRef.update({
            'idField': user.idField,
            'email': user.email,
        })
    } catch (err) {
        throw err
    }
}

export async function DeleteUser(db: DB, id: string) {
    const docRef = db.UserCollection().doc(id);

    await docRef.delete();
}