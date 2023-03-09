import DB from "../db/db";

import { randomUUID } from "crypto";
import { faker } from '@faker-js/faker';

import JobListing from "../models/job";
import { User } from "../models/user";
import Notification from "../models/notification";
import { Status } from "../models/enums/status.enum";
import { Company, Searcher } from "../models/user";
import Application from "../models/application";
import { companyNotification, searcherNotification } from "../models/enums/userNotification.enum";

import * as jobsdb from "../db/jobs";
import * as usersdb from "../db/users";
import * as companiesdb from "../db/companies";
import * as applicationsdb from "../db/applications";
import * as notificationsdb from "../db/notifications";
import * as searcherdb from "../db/searchers";

//CONTROL
const numCompanies = 20
const numSearchers = 100
const numJobListings = 50
const numApplications = 50

//=====================================================USERS=====================================================

async function GenerateUser(): Promise<User> {
    const id = randomUUID();
    const email = faker.internet.email();
    const password = "Password123!"

    return new User(
        id,
        email,
        password,
        "",
        "",
        [],
        undefined,
        undefined,
    )
}

async function GenerateCompany(): Promise<Company> {
    const id = randomUUID()
    const companyName = faker.company.name();
    return new Company(
        companyName,
        id,
    );
}

export async function SeedCompanies(db: DB): Promise<void> {
    const companyPromises: Promise<Company>[] = [];
    for (let i = 0; i < numCompanies; i++) {
        companyPromises.push(GenerateCompany());
    }

    const companies = await Promise.all(companyPromises);

    const createPromises: Promise<void>[] = [];
    for (const company of companies) {
        const user = await GenerateUser();
        user.companyID = company.companyID;
        createPromises.push(companiesdb.CreateCompany(db, user, company));
    }

    await Promise.all(createPromises);
    console.log(`seeded companies`);
}

async function generateSearcher(db: DB): Promise<Searcher> {
    const id = randomUUID()
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();

    return new Searcher(
        firstName,
        lastName,
        [],
        id
    );
}

export async function seedSearchers(db: DB): Promise<void> {
    const searcherPromises: Promise<Searcher>[] = [];
    for (let i = 0; i < numSearchers; i++) {
        searcherPromises.push(generateSearcher(db));
    }

    const searchers = await Promise.all(searcherPromises);

    const createPromises: Promise<void>[] = [];
    for (const searcher of searchers) {
        const user = await GenerateUser();
        createPromises.push(searcherdb.CreateSearcher(db, user, searcher));
    }

    await Promise.all(createPromises);
    console.log(`seeded searchers`);
}

export async function RetrieveRandomSearcherId(db: DB): Promise<string> {
    const searcherIds = await searcherdb.GetAllSearcherIDs(db);
    return searcherIds[Math.floor(Math.random() * searcherIds.length)];
}


//=====================================================JOB-LISTINGS=====================================================

async function generateJobListing(db: DB): Promise<JobListing> {
    const companyIds = await companiesdb.GetAllCompanyIds(db);
    let companyId: string | null = companyIds[Math.floor(Math.random() * companyIds.length)];
    companyId = await usersdb.GetUserID(db, companyId)
    const company = companyId ? await usersdb.RetrieveFullUserByID(db, companyId) : null;
    const jobListingID = randomUUID();

    if (!company || company instanceof Searcher) {
        throw new Error('Company not found');
    }

    return new JobListing(
        jobListingID,
        faker.name.jobTitle(),
        faker.datatype.number({
            'min': 30000,
            'max': 100000
        }),
        faker.lorem.paragraph(),
        company.location,
        faker.helpers.arrayElement(["Full-time", "Part-time", "Contract"]),
        company.companyID,
        faker.helpers.arrayElement(["Engineering", "Sales", "Marketing", "Finance"]),
        faker.date.past(),
        [faker.lorem.words(), faker.lorem.words(), faker.lorem.words()],
        [faker.lorem.words(), faker.lorem.words(), faker.lorem.words()]
    );
}

export async function seedJobListings(db: DB): Promise<void> {
    for (let i = 0; i < numJobListings; i++) {
        const jobListing = await generateJobListing(db);
        await createJobListing(db, jobListing);
    }
    console.log(`Seeded job listings`);
}

export async function RetrieveRandomJobListingId(db: DB): Promise<string> {
    const jobListingIds = await GetAllJobIDs(db);
    return jobListingIds[Math.floor(Math.random() * jobListingIds.length)];
}

export async function RetrieveRandomJobIDArr(db: DB): Promise<string[]> {
    const jobIds = await GetAllJobIDs(db);

    const shuffledJobIds = jobIds.sort(() => 0.5 - Math.random());

    const numJobs = Math.floor(Math.random() * 10) + 1;
    return shuffledJobIds.slice(0, numJobs);
}

//=====================================================APPLICATIONS=====================================================

async function generateApplicationListing(db: DB): Promise<Application> {
    const randomSearcher = await RetrieveRandomSearcherId(db);
    const randomJobListing = await RetrieveRandomJobListingId(db);

    return new Application(
        randomUUID(),
        GetRandomStatus(),
        randomSearcher,
        randomJobListing
    );
}

export async function seedApplicationListings(db: DB): Promise<void> {
    for (let i = 0; i < numApplications; i++) {
        const applicationListing = await generateApplicationListing(db);
        await CreateApplication(db, applicationListing);
    }
    console.log(`Seeded application listings`);
}

function GetRandomStatus(): string {
    const statusValues = Object.values(Status).filter((value) => typeof value === 'string');
    const randomIndex = Math.floor(Math.random() * statusValues.length);
    return statusValues[randomIndex] as string;
}


//=====================================================NOTIFICATIONS=====================================================

async function generateSearcherNotification(db: DB, searcherID: string): Promise<Notification | undefined> {
    const applications = await GetApplicationsBySearcher(db, searcherID);
    const userID = await GetUserID(db, searcherID)

    if (!userID) {
        throw new Error((`userID not found for ${searcherID}`))
    }

    if (applications.length === 0) {
        return undefined;
    }

    const content = GetRandomNotificationEnum("searcher");
    const randomJobListing = applications[Math.floor(Math.random() * applications.length)];

    return {
        id: randomUUID(),
        content,
        application: randomJobListing.id,
        created: faker.date.past(),
        userID: userID
    };
}

async function generateCompanyNotification(db: DB, companyID: string): Promise<Notification | undefined> {
    const jobListingsSnapshot = await db.JobListingCollection().where("companyID", "==", companyID).get();
    const jobListingIds: string[] = jobListingsSnapshot.docs.map((doc) => doc.id);
    const userID = await GetUserID(db, companyID)

    if (!userID) {
        throw new Error((`userID not found for ${companyID}`))
    }

    if (jobListingIds.length === 0) {
        return undefined;
    }

    const content = GetRandomNotificationEnum("company");
    const jobListingID = jobListingIds[Math.floor(Math.random() * jobListingIds.length)];


    return {
        id: randomUUID(),
        content,
        application: jobListingID,
        created: faker.date.past(),
        userID: userID
    };
}

export async function seedNotifications(db: DB): Promise<void> {
    const searchers = await GetAllSearcherIds(db);
    const companies = await GetAllCompanyIds(db);

    for (const searcher of searchers) {
        const searcherNotification = await generateSearcherNotification(db, searcher);
        if (searcherNotification) {
            await createNotification(db, searcherNotification);
        }
    }

    for (const company of companies) {
        const companyNotification = await generateCompanyNotification(db, company);
        if (companyNotification) {
            await createNotification(db, companyNotification);
        }
    }

    console.log(`Seeded notifications`);
}

function GetRandomNotificationEnum(type: "company" | "searcher"): string {
    let enums: Record<string, string>;
    if (type == "searcher")
        enums = searcherNotification as unknown as Record<string, string>;
    else {
        enums = companyNotification as unknown as Record<string, string>;
    }

    const statusValues = Object.values(enums).filter((value) => typeof value === 'string');
    const randomIndex = Math.floor(Math.random() * statusValues.length);
    return statusValues[randomIndex] as string;
}