// // Write a test that creates a user in the db, attempts to login with an email and password, and verifies that the user is returned. Delete the user after.
//
// import { randomUUID } from "crypto";
// import DB from "../db/db";
// import {CreateUser, DeleteUser} from "../db/users";
// import User from "../models/user";
//
// test('create user, retrieve user by email and id, delete user', async () => {
//     // Create a user in the db.
//     const db = new DB();
//     const id = randomUUID();
//     const firstName = 'John';
//     const lastName = 'Doe';
//     const email = 'example@example.com';
//     const password = 'password';
//     const isCompany = false;
//     const companyName = '';
//     const pfpUrl = '';
//     const location = 'London';
//     const savedJobs: string[] = [];
//     const notifications: string[] = [];
//     const user = new User(id, firstName, lastName, email, password, isCompany, companyName, pfpUrl, location, savedJobs, notifications);
//     await CreateUser(db, user);
//
//     // Delete the user.
//     await DeleteUser(db, id);
// });