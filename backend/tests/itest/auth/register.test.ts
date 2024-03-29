import DB from "../../../db/db";
import { DeleteUser, RetrieveFullUserByEmail } from "../../../db/users";

test('register user', async () => {

    jest.setTimeout(20000);

    const email = "itest_register_user@example.com"

    const fetch = require('node-fetch');
    const FormData = require('form-data');

    let formData = new FormData();

    formData.append('user_type', 'searcher');
    formData.append('first_name', 'John');
    formData.append('last_name', 'Doe');
    formData.append('email', email);
    formData.append('password', 'Password123!');
    formData.append('pfp_url', 'TestpfpUrl');
    formData.append('location', 'London');

    const response = await fetch(`http://localhost:8000/auth/register`, {
        method: 'POST',
        body: formData,
    });

    const body = await response.json() as any;

    expect(response.status).toEqual(200);
    expect(body).not.toBeNull();

    // read the body as json

    expect(body).toHaveProperty('access');
    expect(body).toHaveProperty('refresh');

    expect(body.access).not.toBeNull();
    expect(body.refresh).not.toBeNull();

    expect(body.access).not.toEqual('');
    expect(body.refresh).not.toEqual('');

    // Clean up by deleting the newly created user.

    const db = new DB();

    try {
        const user = await RetrieveFullUserByEmail(db, email);

        expect(user).not.toBeNull();
        expect(user?.userID).not.toBeNull();

        await DeleteUser(db, user!.userID);

    } catch (e) {
        expect(e).toBeNull();
    }

});