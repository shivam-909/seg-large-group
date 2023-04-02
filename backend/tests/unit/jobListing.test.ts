import { randomUUID } from "crypto";
import DB from "../../db/db";
import {Company, User} from "../../models/user";
import {faker} from "@faker-js/faker";
import {DeleteUser, DeleteUserByEmail} from "../../db/users";
import {CreateCompany} from "../../db/companies";
import JobListing from "../../models/job";
import {
    CreateJobListing,
    GetAllJobIDs,
    RetrieveJobListing,
    RetrieveJobListingsByFilter,
    UpdateJobListing
} from "../../db/jobs";

test('create jobListing, retrieve jobListing, update jobListing, delete jobListing', async () => {

    const db = new DB();
    const userID = randomUUID();
    const companyID = randomUUID();
    const companyName = "Test Company";
    const email = 'test_company@example.com';
    const password = 'Password123!';

    const companyObject = new Company(
        companyName,
        companyID,

    )

    const user = new User(
        userID,
        email,
        password,
        "",
        "",
        [],
        undefined,
        undefined,
        companyID
    )

    await CreateCompany(db, user, companyObject);

    const id = randomUUID();
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

    const updatedTitle = 'Test Job Title';
    const updatedCompensation = ["100", "day"];
    const updatedDescription = faker.lorem.paragraphs(5000).substring(0, Math.floor(Math.random() * (1000 + 1)) + 2000);
    const updatedLocation = "London";
    const updatedType = ["Remote", "Hybrid"];
    const updatedSchedule = ["Full Time"];
    const updatedIndustry = "Teaching";
    const updatedCoverLetterRequired = false;
    const updatedUrgent = true;
    const updatedQualifications = ["Chemistry","A Level","C"];
    const updatedDatePosted = faker.date.past();
    const updatedBenefits = [faker.lorem.words(), faker.lorem.words()];
    const updatedRequirements = ["blockchains","5","months"];
    const updatedScreeningQuestions = {"Do you have any serious medical conditions?" : false};

    const jobListing = new JobListing(
        id,
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

    const updatedJobListing = new JobListing(
        id,
        updatedTitle,
        updatedCompensation,
        updatedDescription,
        updatedLocation,
        updatedType,
        updatedSchedule,
        companyID,
        updatedIndustry,
        updatedCoverLetterRequired,
        updatedUrgent,
        updatedQualifications,
        updatedDatePosted,
        updatedBenefits,
        updatedRequirements,
        updatedScreeningQuestions,

    )

    await CreateJobListing(db, jobListing);

    // Retrieve the job listing by id.
    const retrievedJobListing = await RetrieveJobListing(db, id);
    expect(retrievedJobListing).not.toBeNull();
    expect(retrievedJobListing!.id).toEqual(id);
    expect(retrievedJobListing!.title).toEqual(title);
    expect(retrievedJobListing!.compensation).toEqual(compensation);
    expect(retrievedJobListing!.description).toEqual(description);
    expect(retrievedJobListing!.location).toEqual(location);
    expect(retrievedJobListing!.type).toEqual(type);
    expect(retrievedJobListing!.schedule).toEqual(schedule);
    expect(retrievedJobListing!.coverLetterRequired).toEqual(coverLetterRequired);
    expect(retrievedJobListing!.urgent).toEqual(urgent);
    expect(retrievedJobListing!.qualifications).toEqual(qualifications);
    // expect(retrievedJobListing!.datePosted).toEqual(datePosted);
    expect(retrievedJobListing!.benefits).toEqual(benefits);
    expect(retrievedJobListing!.requirements).toEqual(requirements);
    expect(retrievedJobListing!.screeningQuestions).toEqual(screeningQuestions);

    //test updating job listing
    await UpdateJobListing(db, updatedJobListing);
    const retrievedUpdatedJobListing = await RetrieveJobListing(db,id);
    expect(retrievedUpdatedJobListing).not.toBeNull();
    expect(retrievedUpdatedJobListing!.id).toEqual(id);
    expect(retrievedUpdatedJobListing!.title).toEqual(updatedTitle);
    expect(retrievedUpdatedJobListing!.compensation).toEqual(updatedCompensation);
    expect(retrievedUpdatedJobListing!.description).toEqual(updatedDescription);
    expect(retrievedUpdatedJobListing!.type).toEqual(updatedType);
    expect(retrievedUpdatedJobListing!.schedule).toEqual(updatedSchedule);
    expect(retrievedUpdatedJobListing!.companyID).toEqual(companyID);
    expect(retrievedUpdatedJobListing!.industry).toEqual(updatedIndustry);
    expect(retrievedUpdatedJobListing!.coverLetterRequired).toEqual(updatedCoverLetterRequired);
    expect(retrievedUpdatedJobListing!.urgent).toEqual(updatedUrgent);
    expect(retrievedUpdatedJobListing!.qualifications).toEqual(updatedQualifications);
    // expect(new Date(retrievedUpdatedJobListing!.datePosted)).toEqual(updatedDatePosted);
    expect(retrievedUpdatedJobListing!.benefits).toEqual(updatedBenefits);
    expect(retrievedUpdatedJobListing!.requirements).toEqual(updatedRequirements);
    expect(retrievedUpdatedJobListing!.screeningQuestions).toEqual(updatedScreeningQuestions);


    //test get job listings by filter.
    const jobListings = await RetrieveJobListingsByFilter(db, {industry: updatedIndustry});
    let found = false;
    for (const listing of jobListings) {
        if(listing.industry != updatedIndustry) found = true;
    }
    expect(found).toEqual(false);

    // Get All Job IDs
    const jobIDs = await GetAllJobIDs(db);
    let repeatedID = false;
    for(let i=1; i<jobIDs.length; i++){
        if(jobIDs[i] == jobIDs[i-1]) repeatedID=true;
    }
    expect(repeatedID).toEqual(false);

    // Delete the job listing.
    await db.JobListingCollection().doc(id).delete();
    const deletedJobListing = await RetrieveJobListing(db, id);
    expect(deletedJobListing).toBeUndefined();
    await DeleteUser(db, userID);





});