import { randomUUID } from "crypto";
import DB from "../../db/db";
import {Searcher, User} from "../../models/user";
import {CreateSearcher, DeleteSearcher, GetAllSearcherIDs, RetrieveSearcherByID} from "../../db/searchers";


test('create searcher, retrieve searcher, delete searcher', async () => {

    const db = new DB();
    const userID = randomUUID();
    const searcherID = randomUUID();
    const email = 'test_searcher_unit@example.com';
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

    const user = new User(
        userID,
        email,
        password,
        "",
        "",
        [],
        undefined,
        searcherID,
        undefined
    )

    await CreateSearcher(db, user, searcher);

    //get company

    const retrivedSearcher = await RetrieveSearcherByID(db, searcherID);
    expect(retrivedSearcher).not.toBeNull();
    expect(retrivedSearcher!.searcherID).toEqual(searcherID);
    expect(retrivedSearcher!.firstName).toEqual(firstName);
    expect(retrivedSearcher!.lastName).toEqual(lastName);
    expect(retrivedSearcher!.cv).toEqual(cv);

    //get all company IDs

    const searcherIDs = await GetAllSearcherIDs(db);
    let repeatedID = false;
    if(searcherIDs.length != 1) {
        for (let i = 1; i < searcherIDs.length; i++) {
            if (searcherIDs[i] == searcherIDs[i - 1]) repeatedID = true;
        }
    }
    expect(repeatedID).toEqual(false);

    //delete the searcher

    await DeleteSearcher(db,searcherID);
    const deletedSearcher = await RetrieveSearcherByID(db, searcherID);
    expect(deletedSearcher).toBeNull();
    await db.UserCollection().doc(userID).delete();

});