import DB from "../../../db/db";
import { DeleteJobListing } from "../../../db/jobs";
import { DeleteUserByEmail, } from "../../../db/users";

it("create listing", async () => {
    jest.setTimeout(10000);

    const fetch = require('node-fetch');
    const FormData = require('form-data');

    // Register as a company
    const email = "test_listings_create@example.com"
    const password = "Password123!"
    const pfp_url = "TestpfpUrl"
    const location = "London"
    const company_name = "Test Company"

    let formData = new FormData();

    formData.append("user_type", "company");
    formData.append("company_name", company_name);
    formData.append("password", password);
    formData.append("email", email);
    formData.append("pfp_url", pfp_url);
    formData.append("location", location);

    // Send POST request to register
    const response = await fetch(`http://localhost:8000/auth/register`, {
        method: 'POST',
        body: formData,
    });


    const body = await response.json() as any;
    expect(response.status).toEqual(200);
    expect(body).not.toBeNull();

    // Expect access and refresh
    expect(body).toHaveProperty('access');
    expect(body).toHaveProperty('refresh');

    expect(body.access).not.toBeNull();
    expect(body.refresh).not.toBeNull();

    expect(body.access).not.toEqual('');
    expect(body.refresh).not.toEqual('');

    // Create a listing
    const title = "Test Listing";
    const compensation = "80000,year";
    const description = "Test Description";
    const job_location = "London";
    const qualifications = "French,Masters,Distinction";
    const job_type = "Remote";
    const benefits = "Free Lunch, Free Snacks";
    const requirements = "C++,2,years";
    const schedule = "Full-time";
    const screeningQuestions = JSON.stringify(
        [
            { "Do you have a degree?": true },
        ]
    )

    // Base 64 encode the screening questions
    const screeningQuestionsEscaped = Buffer.from(screeningQuestions).toString('base64');

    let listingFormData = new FormData();

    listingFormData.append("title", title);
    listingFormData.append("compensation", compensation);
    listingFormData.append("description", description);
    listingFormData.append("location", job_location);
    listingFormData.append("qualifications", qualifications);
    listingFormData.append("location", job_location);
    listingFormData.append("type", job_type);
    listingFormData.append("benefits", benefits);
    listingFormData.append("requirements", requirements);
    listingFormData.append("schedule", schedule);
    listingFormData.append("screening_questions", screeningQuestionsEscaped);

    // Send POST request to create listing
    const listingResponse = await fetch(`http://localhost:8000/api/jobs`, {
        method: 'POST',
        body: listingFormData,
        headers: {
            'Authorization': `Bearer ${body.access}`
        }
    });

    // Expect 200 with id in body
    expect(listingResponse.status).toEqual(200);
    const listingBody = await listingResponse.json() as any;
    expect(listingBody).not.toBeNull();
    expect(listingBody).toHaveProperty('id');
    expect(listingBody.id).not.toBeNull();
    expect(listingBody.id).not.toEqual('');
    const id = listingBody.id;


    // Retrieve the listing
    const listingResponse2 = await fetch(`http://localhost:8000/api/jobs/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${body.access}`
        }
    });


    // Expect 200 with listing in body. If its not 200, print the body.
    expect(listingResponse2.status).toEqual(200);
    const listingBody2 = await listingResponse2.json() as any;
    console.log(listingBody2)
    expect(listingBody2).not.toBeNull();
    expect(listingBody2.listing).not.toBeNull();

    // Clean up by deleting the newly created listing, and company.
    const db = new DB();

    try {
        await DeleteUserByEmail(db, email);
    } catch (e) {
        expect(e).toBeNull();
    }

    try {
        await DeleteJobListing(db, id);
    } catch (e) {
        expect(e).toBeNull();
    }
});