import DB from "../../../db/db";
import { DeleteUserByEmail } from "../../../db/users";

test("refresh token", async () => {
    jest.setTimeout(10000);

    const db = new DB();

    const email = "itest_refresh_access_token@example.com"

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

    const regres = await fetch('http://localhost:8000/auth/register', {
        method: 'POST',
        body: formData,
    });

    const registrationBody = await regres.json() as any;

    expect(regres.status).toEqual(200);
    expect(registrationBody).not.toBeNull();
    expect(registrationBody).toHaveProperty('access');
    expect(registrationBody.access).not.toBeNull();
    expect(registrationBody.access).not.toEqual('');
    expect(registrationBody).toHaveProperty('refresh');
    expect(registrationBody.refresh).not.toBeNull();
    expect(registrationBody.refresh).not.toEqual('');

    let refreshFormData = new FormData();
    refreshFormData.append('refresh_token', registrationBody.refresh);

    const refreshResponse = await fetch('http://localhost:8000/auth/refresh', {
        method: 'POST',
        body: refreshFormData,
    });

    const refreshBody = await refreshResponse.json() as any;

    expect(refreshResponse.status).toEqual(200);
    expect(refreshBody).not.toBeNull();
    expect(refreshBody).toHaveProperty('access');
    expect(refreshBody.access).not.toBeNull();
    expect(refreshBody.access).not.toEqual('');
    expect(refreshBody.access).not.toEqual(regres.access);

    expect(refreshBody).toHaveProperty('refresh');
    expect(refreshBody.refresh).not.toBeNull();
    expect(refreshBody.refresh).not.toEqual('');
    expect(refreshBody.refresh).not.toEqual(regres.refresh);

    try {
        await DeleteUserByEmail(db, email);
    } catch (e) {
        expect(e).toBeNull();
    }

});