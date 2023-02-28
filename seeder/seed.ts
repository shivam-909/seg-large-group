import DB from "../db/db";
import {faker} from '@faker-js/faker';
import JobListing from "../models/job";
import {createJobListing} from "../db/jobs";
import {createUser, retrieveUserById} from "../db/users";
import {Company, Searcher, User} from "../models/user";
import {randomUUID} from "crypto";
import {CreateApplication} from "../db/applications";
import Application from "../models/application";
import {Status} from "../models/enums/status.enum";


export async function GetAllJobIDs(db: DB): Promise<string[]> {
    const snapshot = await db.JobListingCollection().get();
    const jobIds: string[] = [];

    snapshot.forEach(doc => {
        const jobId = doc.id;
        jobIds.push(jobId);
    });

    return jobIds;
}


export async function GetAllCompanyIDs(db: DB): Promise<string[]> {
    const snapshot = await db.UserCollection().get();
    const companyIds: string[] = [];

    snapshot.forEach(doc => {
        const user = doc.data();
        if (user.companyID !== undefined) {
            companyIds.push(user.userID);
        }
    });

    return companyIds;
}


export async function RetrieveRandomJobIDs(db: DB): Promise<string[]> {
    const jobIds = await GetAllJobIDs(db);

    const shuffledJobIds = jobIds.sort(() => 0.5 - Math.random());

    const numJobs = Math.floor(Math.random() * 10) + 1;
    return shuffledJobIds.slice(0, numJobs);
}


export async function GetCompanyListings(db: DB, companyID: string): Promise<string[]> {
    const jobListingsSnapshot = await db.JobListingCollection()
        .where("companyID", "==", companyID)
        .get();

    const jobListingIds: string[] = [];

    jobListingsSnapshot.forEach((doc) => {
        const jobListing = doc.data() as JobListing;
        jobListingIds.push(jobListing.id);
    });

    return jobListingIds;
}


async function generateCompany(db: DB): Promise<Company> {
    const id = randomUUID()
    const companyName = faker.company.name();
    const email = `support@${companyName.toLowerCase().replace(/[^a-zA-Z0-9]/g, '')}.${faker.internet.domainSuffix()}`;
    const notifications:string[] = []


    return new Company(
        id,
        companyName,
        email,
        faker.internet.password(),
        faker.image.avatar(),
        faker.address.city(),
        notifications,
        randomUUID()
    );
}


async function generateSearcher(db: DB): Promise<Searcher> {
    const id = randomUUID()
    const savedJobs = await RetrieveRandomJobIDs(db);
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const email = faker.internet.email(firstName, lastName);
    const notifications:string[] = []

    return new Searcher(
        id,
        firstName,
        lastName,
        email,
        faker.internet.password(),
        faker.image.avatar(),
        faker.address.city(),
        savedJobs,
        notifications,
        randomUUID()
    );
}


async function generateJobListing(db: DB): Promise<JobListing> {
    const companyIds = await GetAllCompanyIDs(db);
    const companyId = companyIds[Math.floor(Math.random() * companyIds.length)];
    const company = companyId ? await retrieveUserById(db, companyId) : null;
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


export async function seedCompanies(db: DB): Promise<void> {
    const numCompanies = 5;

    const companyPromises: Promise<Company>[] = [];
    for (let i = 0; i < numCompanies; i++) {
        companyPromises.push(generateCompany(db));
    }

    const companies = await Promise.all(companyPromises);

    const createPromises: Promise<void>[] = [];
    for (const company of companies) {
        createPromises.push(createUser(db, company));
    }

    await Promise.all(createPromises);
    console.log(`Seeded companies`);
}

export async function seedSearchers(db: DB): Promise<void> {
    const numSearchers = 10;

    const searcherPromises: Promise<Searcher>[] = [];
    for (let i = 0; i < numSearchers; i++) {
        searcherPromises.push(generateSearcher(db));
    }

    const searchers = await Promise.all(searcherPromises);

    const createPromises: Promise<void>[] = [];
    for (const searcher of searchers) {
        createPromises.push(createUser(db, searcher));
    }

    await Promise.all(createPromises);
    console.log(`Seeded searchers`);
}


export async function seedJobListings(db: DB): Promise<void> {
    const numListings = 20;

    for (let i = 0; i < numListings; i++) {
        const jobListing = await generateJobListing(db);
        await createJobListing(db, jobListing);
    }
    console.log(`Seeded job listings`);
}


export async function GetCompanyIDFromUserID(db: DB, userID: string): Promise<string | null> {
    const userDoc = await db.UserCollection().doc(userID).get();
    if (!userDoc.exists) {
        return null;
    }
    const userData = userDoc.data() as User;
    if (!userData.companyID) {
        return null;
    }
    else {
        const companyDoc = await db.CompanyCollection().doc(userData.companyID).get();

        if (!companyDoc.exists) {
            return null;
        }
        return companyDoc.id;
    }
}


export async function GetAllSearcherIds(db: DB): Promise<string[]> {
    const snapshot = await db.SearcherCollection().get();
    const searcherIds: string[] = [];

    snapshot.forEach(doc => {
        const userId = doc.id;
        searcherIds.push(userId);
    });

    return searcherIds;
}

export async function RetrieveRandomSearcherId(db: DB): Promise<string> {
    const searcherIds = await GetAllSearcherIds(db);
    return searcherIds[Math.floor(Math.random() * searcherIds.length)];
}


export async function GetAllJobListingIds(db: DB): Promise<string[]> {
    const snapshot = await db.JobListingCollection().get();
    const jobListingIds: string[] = [];

    snapshot.forEach(doc => {
        const jobListingId = doc.id;
        jobListingIds.push(jobListingId);
    });

    return jobListingIds;
}

export async function RetrieveRandomJobListingId(db: DB): Promise<string> {
    const jobListingIds = await GetAllJobListingIds(db);
    return jobListingIds[Math.floor(Math.random() * jobListingIds.length)];
}



function GetRandomStatus(): Status {
    const statusValues = Object.values(Status);
    const randomIndex = Math.floor(Math.random() * statusValues.length);
    return statusValues[randomIndex] as Status;
}

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
    for (let i = 0; i < 20; i++) {
        const applicationListing = await generateApplicationListing(db);
        await CreateApplication(db, applicationListing);
    }
    console.log(`Seeded application listings`);
}
