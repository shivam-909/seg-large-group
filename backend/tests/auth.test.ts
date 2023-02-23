import { randomUUID } from "crypto";
import DB from "../db/db";
import {CreateUser, DeleteUser, RetrieveUserById} from "../db/users";
import User from "../models/user";
import {request, Server} from 'http';
import FormData from 'form-data';
import bcrypt from "bcrypt";
import app from "../index";

let server: Server;
beforeEach(async () => {
    server = app.listen(3000);

});

afterEach(async () => {
    server.close();
});

describe('login', () => {
    it('logs in with correct email and password', async () => {
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

        const form = new FormData();
        form.append('email', email);
        form.append('password', password);

        await CreateUser(db, user);

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
        await req.end();

        // Delete the user.
        await DeleteUser(db, id);

        // Verify that the user is deleted.
        const deletedUser = await RetrieveUserById(db, id);
        expect(deletedUser).toBeNull();
    });
});


// test('register user, verify user exists, delete user', async () => {
//     // Register a user in the db.
//     const db = new DB();
//     const id = randomUUID();
//     const firstName = 'John';
//     const lastName = 'Doe';
//     const email = 'example@example.com';
//     const password = bcrypt.hashSync('Password123!', 10);
//     const isCompany = false;
//     const companyName = '';
//     const pfpUrl = '';
//     const location = 'London';
//     const savedJobs: string[] = [];
//     const notifications: string[] = [];
//
//     const form = new FormData();
//     form.append('id', id);
//     form.append('firstName', firstName);
//     form.append('firstName', firstName);
//     form.append('lastName', lastName);
//     form.append('email', email);
//     form.append('password', password);
//     form.append('isCompany', isCompany);
//     form.append('companyName', companyName);
//     form.append('pfpUrl', pfpUrl);
//     form.append('location', location);
//     form.append('savedJobs', savedJobs);
//     form.append('notifications', notifications);
//
//     const req = await request(
//         {
//             host: 'localhost',
//             port: '3000',
//             path: '/auth/register',
//             method: 'POST',
//             headers: form.getHeaders(),
//         },
//         response => {
//             expect(response.statusCode).toBe(200);
//         }
//     );
//     await form.pipe(req);
//
//     // Verify that the user is registered.
//     const retrievedUser = await RetrieveUserById(db, id);
//     expect(retrievedUser).not.toBeNull();
//     expect(retrievedUser?.id).toEqual(id);
//     expect(retrievedUser?.email).toEqual(email);
//
//     // Delete the user.
//     await DeleteUser(db, id);
//
//     // Verify that the user is deleted.
//     const deletedUser = await RetrieveUserById(db, id);
//     expect(deletedUser).toBeNull();
// });