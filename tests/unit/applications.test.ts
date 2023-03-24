// Write a test that creates a user in the db, attempts to retrieve the user by email, and verifies that the user is returned. Delete the user after.

import { randomUUID } from "crypto";
import DB from "../../db/db";
import Application from "../../models/application";
import {CreateApplication, RetrieveApplication} from "../../db/applications";

test('create searcher, retrieve searcher by email, delete user', async () => {
    // Create a searcher in the db.

    const db = new DB();
    const id = randomUUID();
    const status = 'Applied';
    const searcher = randomUUID();
    const jobListing = randomUUID();
    const cv = [""];


    const application = new Application(
        id,
        status,
        searcher,
        jobListing,
        cv,
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


    // Delete the application.
    await db.ApplicationCollection().doc(id).delete();
    const deletedApplication = await RetrieveApplication(db, id);
    expect(deletedApplication).toBeNull();
});