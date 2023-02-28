import DB from "./db";
import Application from "../models/application";
import {firestore} from "firebase-admin";
import QuerySnapshot = firestore.QuerySnapshot;

export async function CreateApplication(db: DB, application: Application) {
    const docRef = db.ApplicationCollection().doc(application.id);

    await docRef.set({
        'id': application.id,
        'status': application.status,
        'user': application.user,
    });
}

export async function RetrieveApplication(db: DB, id: string): Promise<Application | null> {
    const docRef = db.ApplicationCollection().doc(id);
    const doc = await docRef.get();

    if (doc.exists) {
        return doc.data() as Application;
    } else {
        return null
    }
}

export async function RetrieveAllApplications(db: DB): Promise<QuerySnapshot> {
    const docRef = db.ApplicationCollection();
    return await docRef.get();
}

export async function UpdateApplication(db: DB, application: Application): Promise<void> {
    const docRef = db.ApplicationCollection().doc(application.id);

    try {
        await docRef.update({
            'id': application.id,
            'status': application.status,
            'user': application.user,
        })
    } catch (err) {
        throw err
    }
}

export async function DeleteApplication(db: DB, id: string) {
    const docRef = db.ApplicationCollection().doc(id);
    await docRef.delete();
}

