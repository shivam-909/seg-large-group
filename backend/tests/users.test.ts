// Write a test that creates a user in the db, attempts to retrieve the user by email, and verifies that the user is returned. Delete the user after.

import { randomUUID } from "crypto";
import DB from "../db/db";
import { CreateUser, RetrieveUserById, RetrieveUserByEmail } from "../db/users";
import User from "../models/user";

test('create user, retrieve user by email, delete user', async () => {
    // Create a user in the db.
    const db = new DB();
    const id = randomUUID();
    const email = 'example@example.com';
    const password = 'password';
    const user = new User(id, password, email);
    await CreateUser(db, user);

    // Retrieve the user by email.
    let retrievedUser = await RetrieveUserByEmail(db, email);
    expect(retrievedUser).not.toBeNull();
    expect(retrievedUser?.id).toEqual(id);
    expect(retrievedUser?.email).toEqual(email);

    // Retrieve the user by id.
    retrievedUser = await RetrieveUserById(db, id);
    expect(retrievedUser).not.toBeNull();
    expect(retrievedUser?.id).toEqual(id);
    expect(retrievedUser?.email).toEqual(email);

    // Delete the user.
    await db.UserCollection().doc(id).delete();

    // Verify that the user is deleted.
    const deletedUser = await RetrieveUserByEmail(db, email);
    expect(deletedUser).toBeNull();
});