import { Company, Searcher } from "../models/user";
import DB from "./db";
import {deleteJobsByCompanyID} from "./jobs";






export async function createCompany(db: DB, company: Company) {
    const docRef = db.CompanyCollection().doc(company.id);

    await docRef.set({
        id: company.id,
        companyName: company.companyName,
        email: company.email,
        hashedPassword: company.hashedPassword,
        pfpUrl: company.pfpUrl,
        location: company.location,
        notifications: company.notifications
    });
}

export async function createSearcher(db: DB, searcher: Searcher) {
    const docRef = db.SearcherCollection().doc(searcher.id);

    await docRef.set({
        id: searcher.id,
        firstName: searcher.firstName,
        lastName: searcher.lastName,
        email: searcher.email,
        hashedPassword: searcher.hashedPassword,
        pfpUrl: searcher.pfpUrl,
        location: searcher.location,
        savedJobs: searcher.savedJobs,
        notifications: searcher.notifications,
    });
}

export async function retrieveCompanyById(db: DB, id: string): Promise<Company | null> {
    const docRef = db.CompanyCollection().doc(id);
    const doc = await docRef.get();

    if (doc.exists) {
        return doc.data() as Company;
    } else {
        return null;
    }
}


export async function retrieveSearcherById(db: DB, id: string): Promise<Searcher | null> {
    const docRef = db.SearcherCollection().doc(id);
    const doc = await docRef.get();

    if (doc.exists) {
        return doc.data() as Searcher;
    } else {
        return null;
    }
}

export async function retrieveCompanyByEmail(db: DB, email: string): Promise<Company | null> {
    const snapshot = await db.CompanyCollection().where('email', '==', email).get();

    if (snapshot.size === 0) {
        return null;
    }

    const doc = snapshot.docs[0];
    return doc.data() as Company;
}


export async function retrieveSearcherByEmail(db: DB, email: string): Promise<Searcher | null> {
    const snapshot = await db.SearcherCollection().where('email', '==', email).get();

    if (snapshot.size === 0) {
        return null;
    }

    const doc = snapshot.docs[0];
    return doc.data() as Searcher;
}

export async function updateCompany(db: DB, company: Company): Promise<void> {
    const docRef = db.CompanyCollection().doc(company.id);
    try {
        await docRef.update({
            companyName: company.companyName,
            email: company.email,
            hashedPassword: company.hashedPassword,
            pfpUrl: company.pfpUrl,
            location: company.location,
            notifications: company.notifications
        });
    } catch (err) {
        throw err;
    }
}

export async function updateSearcher(db: DB, searcher: Searcher): Promise<void> {
    const docRef = db.SearcherCollection().doc(searcher.id);

    try {
        await docRef.update({
            id: searcher.id,
            firstName: searcher.firstName,
            lastName: searcher.lastName,
            email: searcher.email,
            hashedPassword: searcher.hashedPassword,
            pfpUrl: searcher.pfpUrl,
            location: searcher.location,
            savedJobs: searcher.savedJobs,
            notifications:searcher.notifications
        });
    } catch (err) {
        throw err;
    }
}


export async function deleteCompanyByID(db: DB, companyId: string) {
    const docRef = db.CompanyCollection().doc(companyId);
    try {
        await docRef.delete();
    } catch (err) {
        throw err;
    }
    await deleteJobsByCompanyID(db, companyId)
}

export async function deleteSearcher(db: DB, searcherId: string): Promise<void> {
    const docRef = db.SearcherCollection().doc(searcherId);

    try {
        await docRef.delete();
    } catch (err) {
        throw err;
    }
}




