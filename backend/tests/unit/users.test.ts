// Write a test that creates a user in the db, attempts to retrieve the user by email, and verifies that the user is returned. Delete the user after.

import { randomUUID } from "crypto";
<<<<<<< HEAD:backend/tests/users.test.ts
import DB from "../db/db";
import {CreateUser, RetrieveUserById, RetrieveUserByEmail, DeleteUser} from "../db/users";
import User from "../models/user";
=======
import DB from "../../db/db";
import { CreateUser, RetrieveUserByEmail } from "../../db/users";
import User from "../../models/user";
>>>>>>> aaf524ceacdf0c89526f91a95603f7a3e6446e09:backend/tests/unit/users.test.ts

test('create user, retrieve user by email and id, delete user', async () => {
    // Create a user in the db.
    const db = new DB();
    const id = randomUUID();
<<<<<<< HEAD:backend/tests/users.test.ts
    const firstName = 'John';
    const lastName = 'Doe';
    const email = 'example@example.com';
    const password = 'password';
    const isCompany = false;
    const companyName = '';
    const pfpUrl = '';
    const location = 'London';
    const savedJobs: string[] = [];
    const notifications: string[] = [];
    const user = new User(id, firstName, lastName, email, password, isCompany, companyName, pfpUrl, location, savedJobs, notifications);
=======
    const email = 'test_crd_user@example.com';
    const password = 'password';
    const user = new User(
        id,
        "John",
        "Doe",
        email,
        password,
        false,
        "",
        "",
        "",
        [],
        [],
    );

>>>>>>> aaf524ceacdf0c89526f91a95603f7a3e6446e09:backend/tests/unit/users.test.ts
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

    // Update the user.


    // Delete the user.
<<<<<<< HEAD:backend/tests/users.test.ts
    await DeleteUser(db, id);

    // Verify that the user is deleted.
    const deletedUser = await RetrieveUserByEmail(db, email);
    expect(deletedUser).toBeNull();
=======
    await db.UserCollection().doc(id).delete();
>>>>>>> aaf524ceacdf0c89526f91a95603f7a3e6446e09:backend/tests/unit/users.test.ts
});