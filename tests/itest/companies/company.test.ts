import DB from "../../../db/db";
import { DeleteUser, RetrieveFullUserByEmail } from "../../../db/users";

test('register company, retrieve by ID, delete', async () => {
    const email = "itest_register_company@example.com"

    const fetch = require('node-fetch');
    const FormData = require('form-data');

    let formData = new FormData();

    formData.append('user_type', 'company');
    formData.append('company_name', 'Test Company');
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
    expect(fullUser?.companyID).not.toBeNull();

    // Retrieve the searcher by ID, call localhost:8000/api/company/:id with bearer token
    const bearerToken = body.access;
    const response2 = await fetch(`http://localhost:8000/api/company/${fullUser?.companyID}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${bearerToken}`
        }
    });

    expect(response2.status).toEqual(200);
    const body2 = await response2.json() as any;
    expect(body2).not.toBeNull();
    expect(body2).toHaveProperty('companyID');

    await DeleteUser(db, fullUser!.userID);
});