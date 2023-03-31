import DB from "../../../db/db";
import { RetrieveFullUserByEmail, DeleteUser } from "../../../db/users";

test('login user', async () => {

    jest.setTimeout(10000);

    const email = "itest_login_user@example.com"

    const fetch = require('node-fetch');
    const FormData = require('form-data');

    let formData = new FormData();

    formData.append('first_name', 'John');
    formData.append('last_name', 'Doe');
    formData.append('email', email);
    formData.append('password', 'Password123!');
    formData.append('pfp_url', 'TestpfpUrl');
    formData.append('location', 'London');
    formData.append('user_type', 'searcher');

    const regres = await fetch(`http://localhost:8000/auth/register`, {
        method: 'POST',
        body: formData,
    });

    expect(regres.status).toEqual(200);

    const loginFormData = new FormData();
    loginFormData.append('email', email);
    loginFormData.append('password', 'Password123!');

    const loginResponse = await fetch(`http://localhost:8000/auth/login`, {
        method: 'POST',
        body: loginFormData,
    });

    const loginBody = await loginResponse.json() as any;

    expect(loginResponse.status).toEqual(200);
    expect(loginBody).not.toBeNull();


    expect(loginBody).toHaveProperty('access');
    expect(loginBody).toHaveProperty('refresh');

    expect(loginBody.access).not.toBeNull();
    expect(loginBody.refresh).not.toBeNull();

    expect(loginBody.access).not.toEqual('');
    expect(loginBody.refresh).not.toEqual('');

    // Clean up by deleting the newly created user.

    const db = new DB();

    const user = await RetrieveFullUserByEmail(db, email);

    expect(user).not.toBeNull();

    try {
        await DeleteUser(db, user!.userID);
    } catch (e) {
        expect(e).toBeNull();
    }
});