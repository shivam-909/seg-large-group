import { randomUUID } from "crypto";
import DB from "../../db/db";
import {Company, User} from "../../models/user";
import {CreateCompany, DeleteCompany, GetAllCompanyIds, RetrieveCompanyByID} from "../../db/companies";


test('create company, retrieve company, delete company', async () => {

    const db = new DB();
    const userID = randomUUID();
    const companyID = randomUUID();
    const companyName = "Test Company";
    const email = 'test_company_unit@example.com';
    const password = 'Password123!';

    //create the company

    const companyObject = new Company(
        companyName,
        companyID,
    )

    const user = new User(
        userID,
        email,
        password,
        "",
        "",
        [],
        undefined,
        undefined,
        companyID
    )

    await CreateCompany(db, user, companyObject);

    //get company

    const retrievedCompany = await RetrieveCompanyByID(db, companyID);
    expect(retrievedCompany).not.toBeNull();
    expect(retrievedCompany!.companyID).toEqual(companyID);
    expect(retrievedCompany!.companyName).toEqual(companyName);

    //get all company IDs
    const companyIDs = await GetAllCompanyIds(db);
    let repeatedID = false;
    if(companyIDs.length != 1) {
        for (let i = 1; i < companyIDs.length; i++) {
            if (companyIDs[i] == companyIDs[i - 1]) repeatedID = true;
        }
    }
    expect(repeatedID).toEqual(false);

    //delete the company

    await DeleteCompany(db,companyID);
    const deletedCompany = await RetrieveCompanyByID(db, companyID);
    expect(deletedCompany).toBeNull();
    await db.UserCollection().doc(userID).delete();

});