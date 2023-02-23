// Write a test that creates a user in the db, attempt to login with an email and password, and verifies that the user is returned. Delete the user after.

import { randomUUID } from "crypto";
import DB from "../db/db";
import {CreateUser, DeleteUser, RetrieveUserByEmail} from "../db/users";
import User from "../models/user";
import { request } from 'http';
import FormData from 'form-data';
import bcrypt from "bcrypt";

test('create user, attempt to login with an email and password, delete user', async () => {
    // Create a user in the db.
    const db = new DB();
    const id = randomUUID();
    const firstName = 'John';
    const lastName = 'Doe';
    const email = 'example@example.com';
    const password = 'Password123!';
    const isCompany = false;
    const companyName = '';
    const pfpUrl = '';
    const location = 'London';
    const savedJobs: string[] = [];
    const notifications: string[] = [];
    const user = new User(id, firstName, lastName, email, bcrypt.hashSync('Password123!', 10), isCompany, companyName, pfpUrl, location, savedJobs, notifications);
    await CreateUser(db, user);

    // Login with the email and password.
    const form = new FormData();
    form.append('email', email);
    form.append('password', password);

    const req = await request(
        {
            host: 'localhost',
            port: '3000',
            path: '/auth/login',
            method: 'POST',
            headers: form.getHeaders(),
        },
        response => {
            expect(response.statusCode).toBe(200);
        }
    );
    await form.pipe(req);

    // Delete the user.
    await DeleteUser(db, id);

    // Verify that the user is deleted.
    const deletedUser = await RetrieveUserByEmail(db, id);
    expect(deletedUser).toBeNull();
});