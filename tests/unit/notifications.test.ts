import { randomUUID } from "crypto";
import DB from "../../db/db";
import {Company, Searcher, User} from "../../models/user";
import {faker} from "@faker-js/faker";
import {DeleteUser} from "../../db/users";
import {CreateCompany} from "../../db/companies";
import JobListing from "../../models/job";
import {CreateJobListing} from "../../db/jobs";
import {CreateSearcher} from "../../db/searchers";
import Application from "../../models/application";
import Notification from "../../models/notification"
import {CreateNotification, RetrieveNotification} from "../../db/notifications";
import {CreateApplication} from "../../db/applications";

test('create notification, retrieve notification, update notification, delete notification', async () => {

    //create company
    const db = new DB();
    const userID = randomUUID();
    const companyID = randomUUID();
    const companyName = "Test Company";
    const companyEmail = 'company_test@example.com';
    const password = 'Password123!';
    const firstName = 'John';
    const lastName = 'Doe';
    const cv = ["John Doe's CV","https://seg-joblink.s3.eu-west-2.amazonaws.com/cv/1047a922-d91f-43dc-80f2-7273ee90acaa.png.pdf"]


    const companyObject = new Company(
        companyName,
        companyID,

    )

    const companyUser = new User(
        userID,
        companyEmail,
        password,
        "",
        "",
        [],
        undefined,
        undefined,
        companyID
    )

    await CreateCompany(db, companyUser, companyObject);


    //create searcher
    const userId = randomUUID();
    const searcherID = randomUUID();
    const searcherEmail = 'searchertest@example.com';


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
        userId,
        searcherEmail,
        password,
        "",
        "",
        [],
        "",
        searcherID,
        undefined,
    )

    await CreateSearcher(db, user, searcherObject);

    //create jobListing

    const listingID = randomUUID();
    const title = 'Test Job Title';
    const compensation = ["10", "hour"];
    const description = faker.lorem.paragraphs(5000).substring(0, Math.floor(Math.random() * (1000 + 1)) + 2000);
    const location = "London";
    const type = ["Remote"];
    const schedule = ["Part Time"];
    const industry = "Engineering";
    const coverLetterRequired = false;
    const urgent = true;
    const qualifications = ["Biology","A Level","B"];
    const datePosted = faker.date.past();
    const benefits: string[] = [];
    const requirements: string[] = [];
    const screeningQuestions = {};

    const jobListing = new JobListing(
        listingID,
        title,
        compensation,
        description,
        location,
        type,
        schedule,
        companyID,
        industry,
        coverLetterRequired,
        urgent,
        qualifications,
        datePosted,
        benefits,
        requirements,
        screeningQuestions,
    )

    await CreateJobListing(db, jobListing);


    //create application
    const applicationId = randomUUID();
    const status = 'Applied';
    const searcher = searcherObject.searcherID;
    const job = jobListing.id;
    const QnAs: Record<string, string> = {"Why haven’t you gotten your Bachelor’s Degree/Master’s Degree/Ph.D.?": faker.lorem.words(), "Give an example of when you showed leadership qualities.": faker.lorem.words()};
    const coverLetter = "";

    const application = new Application(
        applicationId,
        status,
        searcher,
        job,
        cv,
        QnAs,
        coverLetter
    )

    await CreateApplication(db, application);

    //create linked notification

    const id = randomUUID();
    const content = 'Interview';
    const created = faker.date.past();


    const notification = new Notification(
        id,
        content,
        applicationId,
        created,
        userId
    )

    await CreateNotification(db, notification);

    // Retrieve the notification by id.
    const retrievedNotification = await RetrieveNotification(db, id);
    expect(retrievedNotification).not.toBeNull();
    expect(retrievedNotification!.id).toEqual(id);
    expect(retrievedNotification!.content).toEqual(content);
    expect(retrievedNotification!.applicationID).toEqual(applicationId);
    expect(retrievedNotification!.userID).toEqual(userId);

    // Delete the notification.
    await db.NotificationCollection().doc(id).delete();
    const deletedNotification = await RetrieveNotification(db, id);
    expect(deletedNotification).toBeUndefined();
    await DeleteUser(db, userID);
    await DeleteUser(db, userId);
    await db.ApplicationCollection().doc(applicationId).delete();
    await db.JobListingCollection().doc(listingID).delete();

});