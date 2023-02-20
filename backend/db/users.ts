import User from "../models/user";
import updateUser from "../models/updateUser";
import DB from "./db";

export async function CreateUser(db: DB, user: User) {
    const docRef = db.UserCollection().doc(user.email);

    await docRef.set({
        'email': user.email,
        'hashedPassword': user.hashedPassword,
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

export async function UpdateUser(db: DB, user: User, data: updateUser): Promise<void> {
    const docRef = db.UserCollection().doc(user.id);

    try {
        await docRef.update(data)
    } catch (err) {
        throw err
    }
}

export async function DeleteUser(db: DB, id: string) {
    const docRef = db.UserCollection().doc(id);

    await docRef.delete();
}