import { Company, Searcher, User, UserExpanded } from "../models/user";
import * as companiesdb from "./companies";
import * as searchersdb from "./searchers";
import DB from "./db";
import { DeleteJobsByCompanyID } from "./jobs";
import { randomUUID } from "crypto";


export async function CreateUser(db: DB, user: User) {
  await db.UserCollection().doc(user.userID).set(user);
}

export async function RetrieveFullUserByID(db: DB, id: string): Promise<UserExpanded | null> {
  let docRef = db.UserCollection().doc(id)
  let doc = await docRef.get();

  if (!doc.exists) {
    return null;
  }

  let user = doc.data() as User;

  if (user.companyID) {
    const company = await companiesdb.RetrieveCompanyByID(db, user.companyID);

    if (!company) throw new Error('company not found');

    return UserExpanded.fromUser(user, company);
  }

  if (user.searcherID) {
    const searcher = await searchersdb.RetrieveSearcherByID(db, user.searcherID);

    if (!searcher) throw new Error('searcher not found');

    return UserExpanded.fromUser(user, undefined, searcher);
  }

  throw new Error('invalid user type');
}

export async function RetrieveFullUserByEmail(db: DB, email: string): Promise<UserExpanded | null> {
  const snapshot = await db.UserCollection().where('email', '==', email).get();

  if (snapshot.empty) return null;

  if (snapshot.docs.length > 1) throw new Error('multiple users with same email');

  const user = snapshot.docs[0].data() as User;

  if (user.companyID) {
    const company = await companiesdb.RetrieveCompanyByID(db, user.companyID);

    if (!company) throw new Error('company not found');

    return UserExpanded.fromUser(user, company);
  }

  if (user.searcherID) {
    const searcher = await searchersdb.RetrieveSearcherByID(db, user.searcherID);

    if (!searcher) throw new Error('searcher not found');

    return UserExpanded.fromUser(user, undefined, searcher);
  }

  throw new Error('invalid user type');
}

export async function UpdateUser(db: DB, user: User): Promise<void> {
  const { userID, ...userData } = user;

  const userDocRef = db.UserCollection().doc(userID);

  const baseData: { [key: string]: any } = {};

  const updateKeys = ['email', 'hashedPassword', 'pfpUrl', 'location', 'notifications'];
  for (const key in user) {
    if (updateKeys.includes(key)) {
      baseData[key] = (user as any)[key];
    }
  }

  await userDocRef.update(baseData);
}


export async function DeleteUser(db: DB, userID: string): Promise<void> {
  const to_delete = await RetrieveFullUserByID(db, userID);
  if (!to_delete) {
    throw new Error(`User with ID ${userID} not found`);
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

