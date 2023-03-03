import DB from "./db";
import Application from "../models/application";
import {firestore} from "firebase-admin";
import QuerySnapshot = firestore.QuerySnapshot;

export async function CreateApplication(db: DB, application: Application) {
    const docRef = db.ApplicationCollection().doc(application.id);

    await docRef.set({
        'id': application.id,
        'status': application.status,
        'searcher': application.searcher,
        'jobListing' : application.jobListing
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
            'searcher': application.searcher,
            'jobListing' : application.jobListing


        })
    } catch (err) {
        throw err
    }
}

export async function DeleteApplication(db: DB, id: string) {
    const docRef = db.ApplicationCollection().doc(id);
    await docRef.delete();
}

// export async function GetApplicationsBySearcher(db: DB, searcherID: string): Promise<Application[]> {
//     const applicationsSnapshot = await db.ApplicationCollection().where("searcher", "==", searcherID).get();
//     const applications: Application[] = [];
//
//     applicationsSnapshot.forEach((doc) => {
//         const application = doc.data() as Application;
//         applications.push(application);
//     });
//
//     return applications;
// }

export async function GetApplicationsByFilter(db: DB, filters: {}): Promise<Application[]> {
    const applicationsSnapshot = await db.ApplicationCollection().where(filter, "==", value).get();
    const applications: Application[] = [];

    applicationsSnapshot.forEach((doc) => {
        const application = doc.data() as Application;
        applications.push(application);
    });

    return applications;
}





