import { Company, User } from "../models/user";
import DB from "./db";
import { DeleteJobsByCompanyID } from "./jobs";
import { CreateUser } from "./users";

export async function CreateCompany(db: DB, user: User, company: Company) {
    try {
        await CreateUser(db, user);
    }
    catch (err) {
        throw err;
    }

    await db.CompanyCollection().doc(company.companyID).set({
        companyName: company.companyName,
        companyID: company.companyID,
    });
}

export async function RetrieveCompanyByID(db: DB, id: string): Promise<Company | null> {
    let docRef = db.CompanyCollection().doc(id)
    let doc = await docRef.get();

    if (!doc.exists) {
        return null;
    }

    return doc.data() as Company;
}

export async function DeleteCompany(db: DB, id: string) {
    await DeleteJobsByCompanyID(db, id);
    await db.CompanyCollection().doc(id).delete();
}

export async function GetAllCompanyIds(db: DB): Promise<string[]> {
    const snapshot = await db.CompanyCollection().get();
    const companyIds: string[] = [];

    snapshot.forEach(doc => {
        const companyId = doc.id;
        companyIds.push(companyId);
    });

    return companyIds;
}
