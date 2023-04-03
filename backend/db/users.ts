import { User, UserExpanded } from "../models/user";
import * as companiesdb from "./companies";
import * as searchersdb from "./searchers";
import DB from "./db";
import { ErrorCompanyNotFound, ErrorMultipleUsersFound, ErrorSearcherNotFound, ErrorUserNotFound } from "../service/public";


export async function CreateUser(db: DB, user: User) {
  await db.UserCollection().doc(user.userID).set({
    userID: user.userID,
    email: user.email,
    hashedPassword: user.hashedPassword,
    pfpUrl: user.pfpUrl,
    location: user.location,
    notifications: user.notifications,
    description: user.description,
    companyID: user.companyID,
    searcherID: user.searcherID,
  },
  );
}

export async function RetrieveFullUserByID(db: DB, id: string): Promise<UserExpanded | null> {


  let docRef = db.UserCollection().doc(id);


  let doc = await docRef.get();

  if (!doc.exists) {
    return null;
  }

  let user = doc.data() as User;

  if (user.companyID) {
    const company = await companiesdb.RetrieveCompanyByID(db, user.companyID);

    if (!company) throw new Error(ErrorCompanyNotFound);

    return UserExpanded.fromUser(user, company);
  }

  if (user.searcherID) {
    const searcher = await searchersdb.RetrieveSearcherByID(db, user.searcherID);

    if (!searcher) throw new Error(ErrorSearcherNotFound);

    return UserExpanded.fromUser(user, undefined, searcher);
  }

  throw new Error('invalid user type');
}

export async function RetrieveFullUserByEmail(db: DB, email: string): Promise<UserExpanded | null> {
  const snapshot = await db.UserCollection().where('email', '==', email).get();

  if (snapshot.empty) return null;

  if (snapshot.docs.length > 1) throw new Error(ErrorMultipleUsersFound);

  const user = snapshot.docs[0].data() as User;

  if (user.companyID !== undefined) {
    const company = await companiesdb.RetrieveCompanyByID(db, user.companyID);

    if (!company) throw new Error(ErrorCompanyNotFound);

    return UserExpanded.fromUser(user, company);
  } else if (user.searcherID !== undefined) {
    const searcher = await searchersdb.RetrieveSearcherByID(db, user.searcherID);

    if (!searcher) throw new Error(ErrorSearcherNotFound);

    return UserExpanded.fromUser(user, undefined, searcher);
  }

  console.log(user)

  throw new Error('invalid user type');
}


export async function UpdateUser(db: DB, id: string, data: any): Promise<void> {

  let user = await RetrieveFullUserByID(db, id);

  const baseData: { [key: string]: any } = {};

  const updateKeys = ['email', 'hashedPassword', 'pfpUrl', 'location', 'notifications', 'description'];

  updateKeys.forEach(key => {
    if (key in data && key in user!) {
      baseData[key] = data[key];
    }
  });

  if (Object.keys(baseData).length > 0) {
    if (typeof id === "string") {
      await db.UserCollection().doc(id).update(baseData);
    }
  }
  if (user!.searcherID) {
    const searcherData: { [key: string]: any } = {};
    const searcherUpdateKeys = ['savedJobs', 'skills', 'firstName', 'lastName', 'qualifications', 'cv'];

    searcherUpdateKeys.forEach(key => {
      if (key in data && key in user!.searcher!) {
        searcherData[key] = data[key];
      }
    });

    if (Object.keys(searcherData).length > 0) {
      await db.SearcherCollection().doc(user!.searcherID).update(searcherData);
    }

  }

  if (user!.companyID) {
    const companyData: { [key: string]: any } = {};
    const companyUpdateKeys = ['companyName'];

    companyUpdateKeys.forEach(key => {
      if (key in data && key in user!.company!) {
        companyData[key] = data[key];
      }
    });

    if (Object.keys(companyData).length > 0) {
      await db.CompanyCollection().doc(user!.companyID).update(companyData);
    }
  }

}

export async function DeleteUser(db: DB, userID: string): Promise<void> {
  const to_delete = await RetrieveFullUserByID(db, userID);
  if (!to_delete) {
    throw new Error(ErrorUserNotFound);
  }

  const userDocRef = db.UserCollection().doc(to_delete.userID);
  let searcherID = to_delete.searcherID;
  let companyID = to_delete.companyID;
  await userDocRef.delete();

  if (companyID) {
    await companiesdb.DeleteCompany(db, to_delete.companyID!);
  } else if (searcherID) {
    await searchersdb.DeleteSearcher(db, to_delete.searcherID!);
  }

}

export async function DeleteUserByEmail(db: DB, email: string): Promise<void> {
  const to_delete = await RetrieveFullUserByEmail(db, email);
  if (!to_delete) {
    throw new Error(ErrorUserNotFound);
  }

  const userDocRef = db.UserCollection().doc(to_delete.userID);

  if (to_delete.companyID) {
    await companiesdb.DeleteCompany(db, to_delete.companyID!);
  } else if (to_delete.searcherID) {
    await searchersdb.DeleteSearcher(db, to_delete.searcherID!);
  }

  await userDocRef.delete();
}

export async function GetUserID(db: DB, id: string): Promise<string | null> {
  const snapshot = await db.UserCollection().where('companyID', '==', id).get();
  if (!snapshot.empty) {
    return snapshot.docs[0].id;
  }

  const snapshot2 = await db.UserCollection().where('searcherID', '==', id).get();
  if (!snapshot2.empty) {
    return snapshot2.docs[0].id;
  }

  return null;
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

export async function GetAllCompanyIDs(db: DB): Promise<string[]> {
  const snapshot = await db.CompanyCollection().get();
  const companyIds: string[] = [];

  snapshot.forEach(doc => {
    const companyId = doc.id;
    companyIds.push(companyId);
  });

  return companyIds;
}

export async function RetrieveUserByCompanyID(db: DB, companyID: string): Promise<User | null> {
  const snapshot = await db.UserCollection().where('companyID', '==', companyID).get();
  if (snapshot.empty) return null;
  return snapshot.docs[0].data() as User;
}

export async function RetrieveUserBySearcherID(db: DB, searcherID: string): Promise<User | null> {
  const snapshot = await db.UserCollection().where('searcherID', '==', searcherID).get();
  if (snapshot.empty) return null;
  return snapshot.docs[0].data() as User;
}
