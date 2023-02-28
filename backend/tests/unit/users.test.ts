// Write a test that creates a user in the db, attempts to retrieve the user by email, and verifies that the user is returned. Delete the user after.

import { randomUUID } from "crypto";
import DB from "../../db/db";
import { createUser, retrieveUserByEmail } from "../../db/users";
import {Searcher, User} from "../../models/user";

test('create user, retrieve user by email, delete user', async () => {
    // Create a searcher in the db.
    const db = new DB();
    const id = randomUUID();
    const email = 'test_crd_user@example.com';
    const password = 'password';
    const searcher = new Searcher(
        id,
        "John",
        "Doe",
        email,
        password,
        "picture_url",
        "London",
        [],
        [],
        "0123456789"
    );

    await createUser(db, searcher);

    // Retrieve the searcher by email.
    const retrievedUser = await retrieveUserByEmail(db, email);
    expect(retrievedUser).not.toBeNull();
    expect(retrievedUser?.userID).toEqual(id);
    expect(retrievedUser?.email).toEqual(email);

    // Delete the user.
    await db.UserCollection().doc(id).delete();
});