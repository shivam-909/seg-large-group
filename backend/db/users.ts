import User from "../models/user";
import DB from "./db";

export async function CreateUser(db: DB, user: User) {
    const docRef = db.UserCollection().doc(user.id);

    await docRef.set({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        hashedPassword: user.hashedPassword,
        isCompany: user.isCompany,
        companyName: user.companyName,
        pfpUrl: user.pfpUrl,
        location: user.location,
        savedJobs: user.savedJobs,
        notifications: user.notifications,
    });
}

export async function RetrieveUserById(db: DB, id: string): Promise<User | null> {
    const docRef = db.UserCollection().doc(id);
    const doc = await docRef.get();

    if (doc.exists) {
        return doc.data() as User;
    } else {
        return null;
    }
}

export async function RetrieveUserByEmail(db: DB, email: string): Promise<User | null> {
    const snapshot = await db.UserCollection().where('email', '==', email).get();

    if (snapshot.size === 0) {
        return null;
    }

    const doc = snapshot.docs[0];
    return doc.data() as User;
}

export async function UpdateUser(db: DB, user: User): Promise<void> {
    const docRef = db.UserCollection().doc(user.id);

    try {
        await docRef.update({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            hashedPassword: user.hashedPassword,
            isCompany: user.isCompany,
            companyName: user.companyName,
            pfpUrl: user.pfpUrl,
            location: user.location,
            savedJobs: user.savedJobs,
            notifications: user.notifications,
        })
    } catch (err) {
        throw err
    }
}

export async function DeleteUser(db: DB, id: string) {
    const docRef = db.UserCollection().doc(id);

    await docRef.delete();
}