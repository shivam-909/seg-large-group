// Write a test that creates a user in the db, attempts to retrieve the user by email, and verifies that the user is returned. Delete the user after.

import { randomUUID } from "crypto";
import DB from "../../db/db";
import { CreateSearcher } from "../../db/searchers";
import { CreateUser, RetrieveFullUserByEmail } from "../../db/users";
import { Searcher, User } from "../../models/user";

test('create searcher, retrieve searcher by email, delete user', async () => {
    // Create a searcher in the db.
    const db = new DB();
    const userID = randomUUID();
    const searcherID = randomUUID();
    const email = 'test_crd_searcher@example.com';
    const password = 'Password123!';
    const firstName = 'John';
    const lastName = 'Doe';



    const searcher = new Searcher(
        firstName,
        lastName,
        [],
        searcherID,
    )

    const user = new User(
        userID,
        email,
        password,
        "",
        "",
        [],
        searcherID,
        undefined,
    )

    await CreateSearcher(db, user, searcher)

    // Retrieve the searcher by email.
    const retrievedUser = await RetrieveFullUserByEmail(db, email);
    expect(retrievedUser).not.toBeNull();
    expect(retrievedUser!.userID).toEqual(userID);
    expect(retrievedUser!.email).toEqual(email);
    expect(retrievedUser!.searcherID).toEqual(searcherID);
    expect(retrievedUser!.searcher).not.toBeNull();

    // Delete the user.
    await db.UserCollection().doc(userID).delete();
});