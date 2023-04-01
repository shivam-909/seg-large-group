// Write a test that creates a user in the db, attempts to login with an email and password, and verifies that the user is returned. Delete the user after.

import { randomUUID } from "crypto";
import DB from "../db/db";
import { CreateSearcher } from "../db/searchers";
import { CreateUser, DeleteUser } from "../db/users";
import { Searcher, User } from "../models/user";
import { RetrieveFullUserByEmail } from "../db/users";

test('create searcher, retrieve user by email and id, delete user', async () => {
    // Create a user in the db.
    const db = new DB();
    const userID = randomUUID();
    const firstName = 'John';
    const lastName = 'Doe';
    const email = 'auth_crud_test@example.com'
    const hashedPassword = 'password';
    const pfpUrl = 'https://example.com/pfp.png';
    const cv = ["John Doe's CV","https://seg-joblink.s3.eu-west-2.amazonaws.com/cv/1047a922-d91f-43dc-80f2-7273ee90acaa.png.pdf"];
    const location = 'Toronto, ON';
    const notifications: string[] = [];

    const user = new User(userID, email, hashedPassword, pfpUrl, location, notifications);

    const searcher = new Searcher(firstName, lastName, [], userID, [], [],cv);

    user.searcherID = userID;

    await CreateSearcher(db, user, searcher);

    // Retrieve the user by email.
    const userByEmail = await RetrieveFullUserByEmail(db, email);
    expect(userByEmail).not.toBeNull();

    // Delete the user.
    await DeleteUser(db, userID);

    // Retrieve the user by email.
    const userByEmail2 = await RetrieveFullUserByEmail(db, email);
    expect(userByEmail2).toBeNull();
});