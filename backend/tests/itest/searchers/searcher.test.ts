import DB from "../../../db/db";
import { DeleteSearcher } from "../../../db/searchers";
import { DeleteUser, RetrieveFullUserByEmail } from "../../../db/users";

test('register searcher, retrieve by ID, delete', async () => {
    const email = "itest_register_searcher@example.com"

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

    const db = new DB();
    // RetrieveFullUserByEmail
    const fullUser = await RetrieveFullUserByEmail(db, email)
    expect(fullUser).not.toBeNull();
    expect(fullUser?.searcherID).not.toBeNull();

    // Retrieve the searcher by ID, call localhost:8000/api/searcher/:id with bearer token
    const bearerToken = body.access;
    const response2 = await fetch(`http://localhost:8000/api/searcher/${fullUser?.searcherID}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${bearerToken}`
        }
    });

    expect(response2.status).toEqual(200);
    const body2 = await response2.json() as any;
    expect(body2).not.toBeNull();
    expect(body2).toHaveProperty('searcherID');

    await DeleteUser(db, fullUser!.userID);
});