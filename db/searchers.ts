import { Searcher, User } from "../models/user";
import { DeleteApplicationsForSearcher } from "./applications";
import DB from "./db";
import { CreateUser } from "./users";

export async function CreateSearcher(db: DB, user: User, searcher: Searcher) {
    try {
        await CreateUser(db, user);
    }
    catch (err) {
        throw err;
    }

    await db.SearcherCollection().doc(searcher.searcherID).set({
        firstName: searcher.firstName,
        lastName: searcher.lastName,
        savedJobs: searcher.savedJobs,
        searcherID: searcher.searcherID,
    });
}

export async function RetrieveSearcherByID(db: DB, id: string): Promise<Searcher | null> {
    let docRef = db.SearcherCollection().doc(id)
    let doc = await docRef.get();

    if (!doc.exists) {
        return null;
    }

    return doc.data() as Searcher;
}

export async function DeleteSearcher(db: DB, id: string) {
    await DeleteApplicationsForSearcher(db, id);
    await db.SearcherCollection().doc(id).delete();
}

export async function GetAllSearcherIDs(db: DB): Promise<string[]> {
    const snapshot = await db.SearcherCollection().get();
    const searcherIds: string[] = [];

    snapshot.forEach(doc => {
        const userId = doc.id;
        searcherIds.push(userId);
    });

    return searcherIds;
}