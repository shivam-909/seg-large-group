
import { randomUUID } from "crypto";
import DB from "../../db/db";
import Application from "../../models/application";
import {CreateApplication, RetrieveApplication, UpdateApplication} from "../../db/applications";
import {GetAllSearcherIDs} from "../../db/searchers";
import {GetAllJobIDs} from "../../db/jobs";

test('create searcher, retrieve searcher by email, delete user', async () => {

    const db = new DB();
    const id = randomUUID();
    const status = 'Applied';
    const searcherIDs = await GetAllSearcherIDs(db);
    const searcher = searcherIDs[0];
    const jobListingIDs = await GetAllJobIDs(db);
    const jobListing = jobListingIDs[0];
    const cv = ["John Doe's CV","https://seg-joblink.s3.eu-west-2.amazonaws.com/cv/1047a922-d91f-43dc-80f2-7273ee90acaa.png.pdf"]

    const updatedStatus = 'Applied';
    const updatedSearcher = searcherIDs[1];
    const updatedJobListing = jobListingIDs[1];
    const updatedCv = ["Bob Marley", "https://seg-joblink.s3.eu-west-2.amazonaws.com/cv/1047a922-d91f-43dc-80f2-7273ee90acaa.png.pdf"];

    const application = new Application(
        id,
        status,
        searcher,
        jobListing,
        cv,
    )

    const updatedApplication = new Application(
        id,
        updatedStatus,
        updatedSearcher,
        updatedJobListing,
        updatedCv
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

    // Delete the application.
    await db.ApplicationCollection().doc(id).delete();
    const deletedApplication = await RetrieveApplication(db, id);
    expect(deletedApplication).toBeNull();

});