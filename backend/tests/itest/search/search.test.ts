import DB from "../../../db/db";
import { DeleteJobListing } from "../../../db/jobs";
import { DeleteUserByEmail, } from "../../../db/users";


it("create listing, then search for listing", async () => {
    jest.setTimeout(20000);

    const fetch = require('node-fetch');
    const FormData = require('form-data');

    // Register as a company
    const email = "test_search@example.com"
    const password = "Password123!"
    const pfp_url = "TestpfpUrl"
    const location = "London"
    const company_name = "Test Company-Search"

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


    // Create a listing
    const title = "Test Listing-Search";
    const compensation = "80000,year";
    const description = "Test Description";
    const job_location = "London";
    const qualifications = "French,Masters,Distinction";
    const job_type = "Remote";
    const schedule = "Full-time";
    const companyID = body.typeID;
    const industry = "Software";
    const coverLetterRequired = true;
    const urgent = true;
    const requirements = "testrequirement,8.9,months";
    const screeningQuestions = JSON.stringify(
        [
            { "Do you have a degree?": true },
        ]
    )

    // Base 64 encode the screening questions
    const screeningQuestionsEscaped = Buffer.from(screeningQuestions).toString('base64');

    let listingFormData = new FormData();

    const compensationArray = compensation.split(',');


    listingFormData.append("title", title);
    listingFormData.append("compensation[]", compensationArray[0]);
    listingFormData.append("compensation[]", compensationArray[1]);
    listingFormData.append("description", description);
    listingFormData.append("location", job_location);
    listingFormData.append("qualifications[]", qualifications);
    listingFormData.append("type[]", job_type);
    listingFormData.append("requirements[]", requirements);
    listingFormData.append("schedule[]", schedule);
    listingFormData.append("screening_questions", screeningQuestionsEscaped);
    listingFormData.append("companyID", companyID);
    listingFormData.append("industry", industry);
    listingFormData.append("coverLetterRequired", coverLetterRequired.toString());
    listingFormData.append("urgent", urgent.toString());

    // Send POST request to create listing
    const listingResponse = await fetch(`http://localhost:8000/api/jobs`, {
        method: 'POST',
        body: listingFormData,
        headers: {
            'Authorization': `Bearer ${body.access}`
        }
    });

    const listingBody = await listingResponse.json() as any;
    const id = listingBody.id;


    // Search for the listing

    let searchFormData = new FormData();

    searchFormData.append("term", "testrequirement");



    const searchResponse = await fetch(`http://localhost:8000/api/jobs/search`, {
        method: 'POST',
        body: searchFormData,
    });


    const searchBody = await searchResponse.json() as any;

    // Expect 200 with id in body
    // expect(searchResponse.status).toEqual(200);
    expect(searchBody).not.toBeNull();
    expect(searchBody).toHaveProperty("results");
    expect(searchBody.results).not.toBeNull();
    expect(searchBody.results).not.toEqual("");
    expect(searchBody.results[0]).toHaveProperty("id");
    expect(searchBody.results[0].id).not.toBeNull();
    expect(searchBody.results[0].id).not.toEqual("");
    expect(searchBody.results[0].id).toEqual(id);


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