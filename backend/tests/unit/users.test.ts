// Write a test that creates a user in the db, attempts to retrieve the user by email, and verifies that the user is returned. Delete the user after.

import { randomUUID } from "crypto";
import DB from "../../db/db";
import { CreateSearcher } from "../../db/searchers";
import {
    CreateUser,
    GetUserID,
    RetrieveFullUserByEmail,
    RetrieveFullUserByID,
    RetrieveUserBySearcherID,
    GetAllCompanyIDs,
    GetAllSearcherIDs, RetrieveUserByCompanyID, DeleteUserByEmail, DeleteUser
} from "../../db/users";
import {Company, Searcher, User} from "../../models/user";
import {CreateCompany} from "../../db/companies";
import {ErrorInvalidUserType, ErrorUserNotFound} from "../../service/public";


test('create searcher, create company, retrieve searcher by email, retrieved user by type id, get all searcher and company IDs, delete user', async () => {
    // Create a searcher in the db.
    const db = new DB();
    const searcherUserID = randomUUID();
    const searcherID = randomUUID();
    const searcherEmail = 'test_searcher_crud@example.com';
    const password = 'Password123!';
    const firstName = 'John';
    const lastName = 'Doe';
    const cv = ["John Doe's CV", "https://seg-joblink.s3.eu-west-2.amazonaws.com/cv/1047a922-d91f-43dc-80f2-7273ee90acaa.png.pdf"]

    const searcher = new Searcher(
        firstName,
        lastName,
        [],
        searcherID,
        [],
        [],
        cv
    )

    const searcherUser = new User(
        searcherUserID,
        searcherEmail,
        password,
        "",
        "",
        [],
        "",
        searcherID,
        undefined,
    )

    await CreateSearcher(db, searcherUser, searcher)

    // Create company
    const companyUserID = randomUUID();
    const companyID = randomUUID();
    const companyName = "Test Company";
    const companyEmail = 'test_company_user_unit@example.com';

    // Create the company

    const companyObject = new Company(
        companyName,
        companyID,
    )

    const companyUser = new User(
        companyUserID,
        companyEmail,
        password,
        "",
        "",
        [],
        undefined,
        undefined,
        companyID
    )

    const noTypeID = randomUUID();
    const noTypeEmail = "notypeuser@example.com";
    const noTypeUser = new User(
        noTypeID,
        noTypeEmail,
        password,
        "",
        "",
        [],
        undefined,
        undefined,
        undefined
    )

    await CreateCompany(db, companyUser, companyObject);
    await CreateUser(db, noTypeUser);

    // Retrieve user with no type id

    try{
        await RetrieveFullUserByID(db, noTypeID);
    }catch(e){
        expect((e as Error).message).toEqual(ErrorInvalidUserType);
    }


    try{
        await RetrieveFullUserByEmail(db, noTypeEmail);
    }catch(e){
        expect((e as Error).message).toEqual(ErrorInvalidUserType);
    }

    // Delete a non-existing user
    try{
        await DeleteUser(db, randomUUID());
    }catch(e){
        expect((e as Error).message).toEqual(ErrorUserNotFound);
    }

    // Retrieve the full searcher user
    const retrievedSearcherUser = await RetrieveFullUserByID(db, searcherUserID);
    expect(retrievedSearcherUser).not.toBeNull();
    expect(retrievedSearcherUser!.userID).toEqual(searcherUserID);
    expect(retrievedSearcherUser!.email).toEqual(searcherEmail);
    expect(retrievedSearcherUser!.searcherID).toEqual(searcherID);
    expect(retrievedSearcherUser!.searcher).not.toBeNull();



    // Retrieve the full company user

    const retrievedCompanyUser = await RetrieveFullUserByID(db, companyUserID);
    expect(retrievedCompanyUser).not.toBeNull();
    expect(retrievedCompanyUser!.userID).toEqual(companyUserID);
    expect(retrievedCompanyUser!.email).toEqual(companyEmail);
    expect(retrievedCompanyUser!.companyID).toEqual(companyID);
    expect(retrievedCompanyUser!.company).not.toBeNull();



    // Retrieve the searcher by email.

    const retrievedSearcherUserByEmail = await RetrieveFullUserByEmail(db, searcherEmail);
    expect(retrievedSearcherUserByEmail).not.toBeNull();
    expect(retrievedSearcherUserByEmail!.userID).toEqual(searcherUserID);
    expect(retrievedSearcherUserByEmail!.email).toEqual(searcherEmail);
    expect(retrievedSearcherUserByEmail!.searcherID).toEqual(searcherID);
    expect(retrievedSearcherUserByEmail!.searcher).not.toBeNull();

    // Retrieve the company by email
    const retrievedCompanyUserByEmail = await RetrieveFullUserByEmail(db, companyEmail);
    expect(retrievedCompanyUserByEmail).not.toBeNull();
    expect(retrievedCompanyUserByEmail!.userID).toEqual(companyUserID);
    expect(retrievedCompanyUserByEmail!.email).toEqual(companyEmail);
    expect(retrievedCompanyUserByEmail!.companyID).toEqual(companyID);
    expect(retrievedCompanyUserByEmail!.company).not.toBeNull();


    // Get user id from searcherID

    const retrievedSearcherUserID = await GetUserID(db, searcherID);
    expect(retrievedSearcherUserID).not.toBeNull();
    expect(retrievedSearcherUserID).toEqual(searcherUserID);

    // Get user id from companyID

    const retrievedCompanyUserID = await GetUserID(db, companyID);
    expect(retrievedCompanyUserID).not.toBeNull();
    expect(retrievedCompanyUserID).toEqual(companyUserID);

    // Get user from searcherID

    const retrievedUserBySearcherID = await RetrieveUserBySearcherID(db, searcherID);
    expect(retrievedUserBySearcherID).not.toBeNull();
    expect(retrievedUserBySearcherID!.userID).toEqual(searcherUserID);
    expect(retrievedUserBySearcherID!.email).toEqual(searcherEmail);
    expect(retrievedUserBySearcherID!.searcherID).toEqual(searcherID);

    // Get all company IDs
    const companyIDs = await GetAllCompanyIDs(db);
    let repeatedID = false;
    if(companyIDs.length != 1) {
        for (let i = 1; i < companyIDs.length; i++) {
            if (companyIDs[i] == companyIDs[i - 1]) repeatedID = true;
        }
    }
    expect(repeatedID).toEqual(false);

    // Get all searcher IDs

    const searcherIDs = await GetAllSearcherIDs(db);
    if(searcherIDs.length != 1) {
        for (let i = 1; i < searcherIDs.length; i++) {
            if (searcherIDs[i] == searcherIDs[i - 1]) repeatedID = true;
        }
    }

    // Get User from companyID

    const retrievedUserByCompanyID = await RetrieveUserByCompanyID(db, companyID);
    expect(retrievedUserByCompanyID).not.toBeNull();
    expect(retrievedUserByCompanyID!.userID).toEqual(companyUserID);
    expect(retrievedUserByCompanyID!.email).toEqual(companyEmail);
    expect(retrievedUserByCompanyID!.companyID).toEqual(companyID);

    // Delete the user.
    await DeleteUserByEmail(db, searcherEmail);
    await DeleteUserByEmail(db, companyEmail);
    await DeleteUser(db, noTypeID);
    expect(await RetrieveFullUserByEmail(db, searcherEmail)).toBeNull();
    expect(await RetrieveFullUserByEmail(db, companyEmail)).toBeNull();

});