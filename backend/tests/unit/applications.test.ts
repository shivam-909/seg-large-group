
import { randomUUID } from "crypto";
import DB from "../../db/db";
import Application from "../../models/application";
import {
    CreateApplication, GetApplicationsByFilter,
    RetrieveApplication,
    UpdateApplication
} from "../../db/applications";
import {Searcher, User} from "../../models/user";
import {CreateSearcher} from "../../db/searchers";
import {faker} from "@faker-js/faker";
import {DeleteUser} from "../../db/users";

test('create application, retrieve application, get application by filter, update application, delete application', async () => {

    const db = new DB();
    const userID = randomUUID();
    const searcherID = randomUUID();
    const email = 'searchertest@example.com';
    const password = 'Password123!';
    const firstName = 'John';
    const lastName = 'Doe';
    const cv = ["John Doe's CV","https://seg-joblink.s3.eu-west-2.amazonaws.com/cv/1047a922-d91f-43dc-80f2-7273ee90acaa.png.pdf"]


    const searcherObject = new Searcher(
        firstName,
        lastName,
        [],
        searcherID,
        [],
        [],
        cv
    )

    const user = new User(
        userID,
        email,
        password,
        "",
        "",
        [],
        "",
        searcherID,
        undefined,
    )

    await CreateSearcher(db, user, searcherObject);



    const id = randomUUID();
    const status = 'Applied';
    const searcher = searcherObject.searcherID;
    const jobListing = randomUUID();
    const QnAs: Record<string, string> = {"Why haven’t you gotten your Bachelor’s Degree/Master’s Degree/Ph.D.?": faker.lorem.words(), "Give an example of when you showed leadership qualities.": faker.lorem.words()};
    const coverLetter = "";

    const updatedStatus = 'Rejected';
    const updatedSearcher = randomUUID();
    const updatedJobListing = randomUUID();
    const updatedCv = ["Bob Marley", "https://seg-joblink.s3.eu-west-2.amazonaws.com/cv/1047a922-d91f-43dc-80f2-7273ee90acaa.png.pdf"];
    const updatedCoverLetter = faker.lorem.paragraphs(5000).substring(0, Math.floor(Math.random() * (100 + 1)) + 500);
    const updatedQnAs: Record<string, string> = {"Give an example of when you showed leadership qualities.": faker.lorem.words()};

    const application = new Application(
        id,
        status,
        searcher,
        jobListing,
        cv,
        QnAs,
        coverLetter,

    )

    const updatedApplication = new Application(
        id,
        updatedStatus,
        updatedSearcher,
        updatedJobListing,
        updatedCv,
        updatedQnAs,
        updatedCoverLetter,
    )

    await CreateApplication(db, application);



    // Retrieve the application by id.
    const retrievedApplication = await RetrieveApplication(db, id);
    expect(retrievedApplication).not.toBeNull();
    expect(retrievedApplication!.id).toEqual(id);
    expect(retrievedApplication!.status).toEqual(status);
    expect(retrievedApplication!.searcher).toEqual(searcher);
    expect(retrievedApplication!.jobListing).toEqual(jobListing);
    expect(retrievedApplication!.cv).toEqual(cv);

    //test updating application
    await UpdateApplication(db, updatedApplication);
    const retrievedUpdatedApplication = await RetrieveApplication(db, id);
    expect(retrievedUpdatedApplication).not.toBeNull();
    expect(retrievedUpdatedApplication!.id).toEqual(id);
    expect(retrievedUpdatedApplication!.status).toEqual(updatedStatus);
    expect(retrievedUpdatedApplication!.searcher).toEqual(updatedSearcher);
    expect(retrievedUpdatedApplication!.jobListing).toEqual(updatedJobListing);
    expect(retrievedUpdatedApplication!.cv).toEqual(updatedCv);

    // test get application by filter.
    const applications = await GetApplicationsByFilter(db, {status: updatedStatus});
    let found = false;
    for (const application of applications) {
        if(application.status != updatedStatus) found = true;
    }
    expect(found).toEqual(false);


    // Delete the application.
    await db.ApplicationCollection().doc(id).delete();
    const deletedApplication = await RetrieveApplication(db, id);
    expect(deletedApplication).toBeNull();
    await DeleteUser(db, userID);

});