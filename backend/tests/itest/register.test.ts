test('register user', async () => {

    const email = "itest_register_user@example.com"

    const fetch = require('node-fetch');
    const FormData = require('form-data');

    let formData = new FormData();

    formData.append('email', email);
    formData.append('password', 'Password123!');

    const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        body: formData,
    });

    expect(response.status).toEqual(200);
    expect(response.body).not.toBeNull();

    // read the body as json
    const body = await response.json() as any;

    expect(body).toHaveProperty('access');
    expect(body).toHaveProperty('refresh');

    expect(body.access).not.toBeNull();
    expect(body.refresh).not.toBeNull();

    expect(body.access).not.toEqual('');
    expect(body.refresh).not.toEqual('');

    // Clean up by deleting the newly created user.

    // const db = new DB();

    // const user = await RetrieveUserByEmail(db, 'example@example.com');

    // expect(user).not.toBeNull();

    // await DeleteUser(db, user!.idField);
});