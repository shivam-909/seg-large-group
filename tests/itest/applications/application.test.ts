import DB from "../../../db/db";
import { DeleteJobListing } from "../../../db/jobs";
import { DeleteUserByEmail, } from "../../../db/users";
import {faker} from "@faker-js/faker";
import {DeleteApplication} from "../../../db/applications";
import FormData from "form-data";
import fetch from "node-fetch";


it("create application", async () => {
    jest.setTimeout(20000);

    const fetch = require('node-fetch');
    const FormData = require('form-data');

    // Register as a company
    const companyEmail = "test_applications_create@example.com"
    const password = "Password123!"
    const pfp_url = "TestpfpUrl"
    const location = "London"
    const company_name = "Test Company"

    let formData = new FormData();

    formData.append("user_type", "company");
    formData.append("company_name", company_name);
    formData.append("password", password);
    formData.append("email", companyEmail);
    formData.append("pfp_url", pfp_url);
    formData.append("location", location);

    // Send POST request to register
    const response = await fetch(`http://localhost:8000/auth/register`, {
        method: 'POST',
        body: formData,
    });
    expect(response.status).toEqual(200);
    const body = await response.json() as any;
    expect(body).not.toBeNull();

    // Expect access and refresh
    expect(body).toHaveProperty('access');
    expect(body).toHaveProperty('refresh');

    expect(body.access).not.toBeNull();
    expect(body.refresh).not.toBeNull();

    expect(body.access).not.toEqual('');
    expect(body.refresh).not.toEqual('');


    //create jobListing
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
    const listingID = listingBody.id;


    //create searcher
    const searcherEmail = "searcher@example.com"
    let searcherFormData = new FormData();

    searcherFormData.append('user_type', 'searcher');
    searcherFormData.append('first_name', 'John');
    searcherFormData.append('last_name', 'Doe');
    searcherFormData.append('email', searcherEmail);
    searcherFormData.append('password', 'Password123!');
    searcherFormData.append('pfp_url', 'TestpfpUrl');
    searcherFormData.append('location', 'London');

    const searcherResponse = await fetch(`http://localhost:8000/auth/register`, {
        method: 'POST',
        body: searcherFormData,
    });


    expect(searcherResponse.status).toEqual(200);
    const searcherBody = await searcherResponse.json() as any;
    console.log("SEARCHER: " + searcherBody);
    expect(searcherBody).not.toBeNull();
    expect(searcherBody).toHaveProperty('typeID');
    expect(searcherBody.typeID).not.toBeNull();
    expect(searcherBody.typeID).not.toEqual('');

    // read the body as json

    expect(searcherBody).toHaveProperty('access');
    expect(searcherBody).toHaveProperty('refresh');

    expect(searcherBody.access).not.toBeNull();
    expect(searcherBody.refresh).not.toBeNull();

    expect(searcherBody.access).not.toEqual('');
    expect(searcherBody.refresh).not.toEqual('');


    // Create an application
    const status = 'Applied';
    const cv = ["John Doe's CV","https://seg-joblink.s3.eu-west-2.amazonaws.com/cv/1047a922-d91f-43dc-80f2-7273ee90acaa.png.pdf"]
    const coverLetter = faker.lorem.paragraphs(5000).substring(0, Math.floor(Math.random() * (100 + 1)) + 500); ;
    const QnAs = JSON.stringify(
        [
            { "Give an example of when you showed leadership qualities.": faker.lorem.words() },
        ]
    )

    // Base 64 encode the  QnAs
    const QnAsEscaped = Buffer.from(QnAs).toString('base64');

    let applicationFormData = new FormData();

    applicationFormData.append("status", status);
    applicationFormData.append("cv[]", cv[0]);
    applicationFormData.append("cv[]", cv[1]);
    applicationFormData.append("QnAs", QnAs);
    applicationFormData.append("coverLetter", coverLetter);
    applicationFormData.append("jobListing", listingBody.id);
    applicationFormData.append("searcher", searcherBody.typeID );


    // Send POST request to create listing
    const applicationResponse = await fetch(`http://localhost:8000/api/applications/add`, {
        method: 'POST',
        body: applicationFormData,

    });

    // Expect 200 with id in body

    expect(applicationResponse.status).toEqual(200);
    const applicationBody = await applicationResponse.json() as any;
    expect(applicationBody).not.toBeNull();
    expect(applicationBody).toHaveProperty('id');
    expect(applicationBody.id).not.toBeNull();
    expect(applicationBody.id).not.toEqual('');
    const id = applicationBody.id;


    // Retrieve the application
    const applicationResponse2 = await fetch(`http://localhost:8000/api/applications/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${searcherBody.access}`
        }
    });


    // Expect 200 with application in body. If its not 200, print the body.
    expect(applicationResponse2.status).toEqual(200);
    const applicationBody2 = await applicationResponse2.json() as any;
    expect(applicationBody2).not.toBeNull();
    expect(applicationBody2.application).not.toBeNull();

    // Clean up by deleting the newly created application, listing and searcher.
    const db = new DB();

    try {
        await DeleteUserByEmail(db, companyEmail);
    } catch (e) {
        expect(e).toBeNull();
    }

    try {
        await DeleteUserByEmail(db, searcherEmail);
    } catch (e) {
        expect(e).toBeNull();
    }

    try{
        await DeleteJobListing(db, listingID);
    } catch(e){
        expect(e).toBeNull();
    }

    try {
        await DeleteApplication(db, id);
    } catch (e) {
        expect(e).toBeNull();
    }
});