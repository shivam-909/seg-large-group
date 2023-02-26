import {Company, Searcher, User} from "../models/user";
import DB from "./db";
import {deleteJobsByCompanyID} from "./jobs";


export async function createUser(db: DB, user: User) {
    const baseUser: Omit<User, 'companyID' | 'searcherID'> = {
        userID: user.userID,
        email: user.email,
        hashedPassword: user.hashedPassword,
        pfpUrl: user.pfpUrl,
        location: user.location,
        notifications: user.notifications,
    };

    let type: 'company' | 'searcher' | null = null;
    let typeID: string | null = null;

    if (user.companyID) {
        const companyUser: Omit<Company, 'userID'> & Pick<User, 'userID'> = {
            ...baseUser,
            userID: user.userID,
            companyID: user.companyID,
            companyName: (user as Company).companyName,
        };
        await db.CompanyCollection().doc(user.companyID).set(companyUser);
        type = 'company';
        typeID = user.companyID;
    } else if (user.searcherID) {
        const searcherUser: Omit<Searcher, 'userID'> & Pick<User, 'userID'> = {
            ...baseUser,
            userID: user.userID,
            searcherID: user.searcherID,
            firstName: (user as Searcher).firstName,
            lastName: (user as Searcher).lastName,
            savedJobs: (user as Searcher).savedJobs,
        };
        await db.SearcherCollection().doc(user.searcherID).set(searcherUser);
        type = 'searcher';
        typeID = user.searcherID;
    }

    if (type && typeID && baseUser) {
        await db.UserCollection().doc(user.userID).set({
            ...baseUser,
            [`${type}ID`]: typeID,
        } as User);
    }
}

export async function retrieveUserById(db: DB, id: string): Promise<Company | Searcher | null> {
    let docRef = db.UserCollection().doc(id)
    let doc = await docRef.get();

    if (doc.exists) {
        const data = doc.data() as Company | Searcher;
        if (data.companyID) {
            docRef = db.CompanyCollection().doc(data.companyID);
            doc = await docRef.get();
            return doc.data() as Company;
        } else if (data.searcherID) {
            docRef = db.SearcherCollection().doc(data.searcherID);
            doc = await docRef.get();
            return doc.data() as Searcher;
        } else {
            return null;
        }
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

export async function updateUser<T extends { userID: string; }>(db: DB, user: T): Promise<void> {
    const { userID, ...userData } = user;

    let companyDocRef: FirebaseFirestore.DocumentReference;
    let userDocRef: FirebaseFirestore.DocumentReference;
    if ('companyID' in user) {
        companyDocRef = db.CompanyCollection().doc((user as unknown as Company).companyID);
        userDocRef = db.UserCollection().doc(userID);
    } else if ('searcherID' in user) {
        companyDocRef = db.SearcherCollection().doc((user as unknown as Searcher).searcherID);
        userDocRef = db.UserCollection().doc(userID);
    } else {
        throw new Error('Invalid user type');
    }

    const companyUpdate = companyDocRef.update(userData);
    const baseData: { [key: string]: any } = {};

    if ('email' in user) baseData['email'] = user.email;
    if ('hashedPassword' in user) baseData['hashedPassword'] = user.hashedPassword;
    if ('pfpUrl' in user) baseData['pfpUrl'] = user.pfpUrl;
    if ('location' in user) baseData['location'] = user.location;
    if ('notifications' in user) baseData['notifications'] = user.notifications;
    if ('companyID' in user) baseData['companyID'] = (user as unknown as Company).companyID;
    else if ('searcherID' in user) baseData['searcherID'] = (user as unknown as Searcher).searcherID;

    const userUpdate = userDocRef.update(baseData);

    try {
        await Promise.all([companyUpdate, userUpdate]);
    } catch (err) {
        throw err;
    }
}

export async function deleteUser<T extends { userID: string }>(db: DB, user: T): Promise<void> {
    const { userID } = user;

    const to_delete = await retrieveUserById(db, user.userID);
    if (!to_delete) {
        throw new Error(`User with ID ${userID} not found`);
    }

    const userDocRef = db.UserCollection().doc(to_delete.userID);
    if ('companyID' in to_delete) {
        const companyDocRef = db.CompanyCollection().doc(to_delete?.companyID!);
        await deleteJobsByCompanyID(db, to_delete?.companyID!);
        await companyDocRef.delete();
    } else if ('searcherID' in to_delete) {
        const searcherDocRef = db.SearcherCollection().doc(to_delete?.searcherID!);
        await searcherDocRef.delete();
    } else {
        throw new Error('Invalid user type');
    }

    await userDocRef.delete();
}

