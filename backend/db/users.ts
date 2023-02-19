import User from "../models/user";
import DB from "./db";
import { Error } from "../service/public";

export async function CreateUser(db: DB, user: User) {
    const docRef = db.UserCollection().doc(user.username);

    await docRef.set({
        'username': user.username,
        'hashedPassword': user.hashedPassword,
        'email': user.email,
    });
}

export async function RetrieveUser(db: DB, email: string): Promise<User> {
    const docRef = db.UserCollection();
    const snapshot = await docRef.where('email', '==', email).get();

    if (snapshot.size == 1) {
        return snapshot.docs[0].data() as User;
    } else if (snapshot.empty) {
        throw {
            message: "user does not exist",
        }
    } else {
        throw {
            message: "multiple emails match",
        }
    }
}

export async function UpdateUser(db: DB, user: User): Promise<void> {
    const docRef = db.UserCollection().doc(user.username);

    try {
        await docRef.update({
            'username': user.username,
        })
    } catch (err) {
        throw err
    }
}

export async function DeleteUser(db: DB, username: string) {
    const docRef = db.UserCollection().doc(username);

    await docRef.delete();
}