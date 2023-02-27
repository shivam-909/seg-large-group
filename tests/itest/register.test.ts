import DB from "../../db/db";
import { deleteUser, retrieveUserByEmail } from "../../db/users";

test('register user', async () => {

    const email = "itest_register_user@example.com"

    const fetch = require('node-fetch');
    const FormData = require('form-data');

    let formData = new FormData();

    formData.append('email', email);
    formData.append('password', 'Password123!');
    formData.append('first_name', 'John');
    formData.append('last_name', 'Doe');
    formData.append('is_company', 'false');

    const response = await fetch('http://localhost:3000/auth/register', {
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

    const user = await retrieveUserByEmail(db, email);

    expect(user).not.toBeNull();

    await deleteUser(db, user!.idField);
});