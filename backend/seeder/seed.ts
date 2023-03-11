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
import bcrypt from "bcrypt";
import * as jobsdb from "../db/jobs";
import * as usersdb from "../db/users";
import * as companiesdb from "../db/companies";
import * as applicationsdb from "../db/applications";
import * as notificationsdb from "../db/notifications";
import * as searcherdb from "../db/searchers";
import { ErrorCompanyNotFound, ErrorNoCompaniesExist, ErrorUserNotFound } from "../service/public";

//CONTROL
const numCompanies = 2
const numSearchers = 10
const numJobListings = 5
const numApplications = 5

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

async function GenerateSearcher(db: DB): Promise<Searcher> {
    const id = randomUUID()
    const savedJobs = await RetrieveRandomJobIDArr(db);
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();

    return new Searcher(
        firstName,
        lastName,
        savedJobs,
        id
    );
}

export async function SeedSearchers(db: DB): Promise<void> {
    const searcherPromises: Promise<Searcher>[] = [];
    for (let i = 0; i < numSearchers; i++) {
        searcherPromises.push(GenerateSearcher(db));
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

export function hashPassword(password: string): string {
    const hash = ((): string => {
        try {
            return bcrypt.hashSync(password, 10)
        } catch (e) {
            return ""
        }
    })();

    return hash as string;
}


//=====================================================JOB-LISTINGS=====================================================

async function GetRandomCompany(db: DB): Promise<Company> {
    const companyIds = await companiesdb.GetAllCompanyIds(db);

    if (companyIds.length === 0) {
        console.log("no companies exist");
        throw new Error(ErrorNoCompaniesExist);
    }

    let companyId: string = companyIds[Math.floor(Math.random() * companyIds.length)];

    const company = await companiesdb.RetrieveCompanyByID(db, companyId);

    if (!company) {
        console.log("company not found for id: " + companyId);
        throw new Error(ErrorCompanyNotFound);
    }

    return company;
}

async function GenerateJobListing(db: DB): Promise<JobListing> {
    const company = await GetRandomCompany(db);
    const user = await usersdb.RetrieveUserByCompanyID(db, company.companyID);
    if (!user) {
        console.log("user not found for company id: " + company.companyID);
        throw new Error(ErrorUserNotFound);
    }

    const id = randomUUID();
    return new JobListing(
        id,
        faker.name.jobTitle(),
        faker.datatype.number({
            'min': 30000,
            'max': 100000
        }),
        faker.lorem.paragraph(),
        user.location,
        faker.helpers.arrayElement(["Full-time", "Part-time", "Contract"]),
        company.companyID,
        faker.helpers.arrayElement(["Engineering", "Sales", "Marketing", "Finance"]),
        faker.date.past(),
        [faker.lorem.words(), faker.lorem.words(), faker.lorem.words()],
        [faker.lorem.words(), faker.lorem.words(), faker.lorem.words()]
    );
}

export async function SeedJobListings(db: DB): Promise<void> {
    for (let i = 0; i < numJobListings; i++) {
        const jobListing = await GenerateJobListing(db);
        await jobsdb.CreateJobListing(db, jobListing);
    }
    console.log(`Seeded job listings`);
}

export async function RetrieveRandomJobListingID(db: DB): Promise<string> {
    const jobListingIds = await jobsdb.GetAllJobIDs(db);
    return jobListingIds[Math.floor(Math.random() * jobListingIds.length)];
}

export async function RetrieveRandomJobIDArr(db: DB): Promise<string[]> {
    const jobIds = await jobsdb.GetAllJobIDs(db);

    const shuffledJobIds = jobIds.sort(() => 0.5 - Math.random());

    const numJobs = Math.floor(Math.random() * 10) + 1;
    return shuffledJobIds.slice(0, numJobs);
}

//=====================================================APPLICATIONS=====================================================

async function GenerateApplicationListing(db: DB): Promise<Application> {
    const randomSearcher = await RetrieveRandomSearcherId(db);
    const randomJobListing = await RetrieveRandomJobListingID(db);

    return new Application(
        randomUUID(),
        GetRandomStatus(),
        randomSearcher,
        randomJobListing
    );
}

export async function SeedApplicationListings(db: DB): Promise<void> {
    for (let i = 0; i < numApplications; i++) {
        const applicationListing = await GenerateApplicationListing(db);
        await applicationsdb.CreateApplication(db, applicationListing);
    }
    console.log(`seeded application listings`);
}

function GetRandomStatus(): string {
    const statusValues = Object.values(Status).filter((value) => typeof value === 'string');
    const randomIndex = Math.floor(Math.random() * statusValues.length);
    return statusValues[randomIndex] as string;
}


//=====================================================NOTIFICATIONS=====================================================

async function GenerateSearcherNotification(db: DB, searcherID: string): Promise<Notification | undefined> {
    const applications = await applicationsdb.GetApplicationsByFilter(db, { "searcherID": searcherID });
    const user = await usersdb.RetrieveUserBySearcherID(db, searcherID);

    if (!user) {
        console.log("user not found for " + searcherID)
        throw new Error(ErrorUserNotFound)
    }

    if (applications.length === 0) {
        return undefined;
    }

    const content = GetRandomNotificationEnum("searcher");
    const randomJobListing = applications[Math.floor(Math.random() * applications.length)];

    return {
        id: randomUUID(),
        content,
        applicationID: randomJobListing.id,
        created: faker.date.past(),
        userID: user.userID,
    };
}

async function GenerateCompanyNotification(db: DB, companyID: string): Promise<Notification | undefined> {
    const jobListingsSnapshot = await db.JobListingCollection().where("companyID", "==", companyID).get();
    const jobListingIds: string[] = jobListingsSnapshot.docs.map((doc) => doc.id);
    const user = await usersdb.RetrieveUserByCompanyID(db, companyID);

    if (!user) {
        console.log("user not found for " + companyID)
        throw new Error(ErrorUserNotFound)
    }

    if (jobListingIds.length === 0) {
        return undefined;
    }

    const content = GetRandomNotificationEnum("company");
    const jobListingID = jobListingIds[Math.floor(Math.random() * jobListingIds.length)];

    const applicationsSnapshot = await db.ApplicationCollection().where("jobListing", "==", jobListingID).get();
    const applicationIds: string[] = applicationsSnapshot.docs.map((doc) => doc.id);
    const applicationID = applicationIds[Math.floor(Math.random() * jobListingIds.length)];




    return {
        id: randomUUID(),
        content,
        applicationID: applicationID,
        created: faker.date.past(),
        userID: user.userID,
    };
}

export async function SeedNotifications(db: DB): Promise<void> {
    const searchers = await searcherdb.GetAllSearcherIDs(db);
    const companies = await companiesdb.GetAllCompanyIds(db);

    for (const searcher of searchers) {
        const searcherNotification = await GenerateSearcherNotification(db, searcher);
        if (searcherNotification) {
            await notificationsdb.CreateNotification(db, searcherNotification);
        }
    }

    for (const company of companies) {
        const companyNotification = await GenerateCompanyNotification(db, company);
        if (companyNotification) {
            await notificationsdb.CreateNotification(db, companyNotification);
        }
    }

    console.log(`seeded notifications`);
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