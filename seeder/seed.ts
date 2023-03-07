import DB from "../db/db";
import {faker} from '@faker-js/faker';
import JobListing from "../models/job";
import {createJobListing, getAllJobIDs} from "../db/jobs";
import {createUser, getAllCompanyIDs, getAllSearcherIDs, getUserID, retrieveUserByID} from "../db/users";
import {Company, Searcher} from "../models/user";
import {randomUUID} from "crypto";
import {CreateApplication, GetApplicationsByFilter} from "../db/applications";
import Application from "../models/application";
import {Status} from "../models/enums/status.enum";
import {companyNotification, searcherNotification} from "../models/enums/userNotification.enum";
import {createNotification} from "../db/notifications";
import Notification from "../models/notification";

//CONTROL
const numCompanies = 2
const numSearchers = 10
const numJobListings = 5
const numApplications = 5

//=====================================================USERS=====================================================

async function generateCompany(): Promise<Company> {
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

export async function seedCompanies(db: DB): Promise<void> {
    const companyPromises: Promise<Company>[] = [];
    for (let i = 0; i < numCompanies; i++) {
        companyPromises.push(generateCompany());
    }

    const companies = await Promise.all(companyPromises);

    const createPromises: Promise<void>[] = [];
    for (const company of companies) {
        createPromises.push(createUser(db, company));
    }

    await Promise.all(createPromises);
    console.log(`Seeded companies`);
}

async function generateSearcher(db: DB): Promise<Searcher> {
    const id = randomUUID()
    const savedJobs = await retrieveRandomJobIDArr(db);
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

export async function seedSearchers(db: DB): Promise<void> {
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

export async function retrieveRandomSearcherId(db: DB): Promise<string> {
    const searcherIds = await getAllSearcherIDs(db);
    return searcherIds[Math.floor(Math.random() * searcherIds.length)];
}


//=====================================================JOB-LISTINGS=====================================================

async function generateJobListing(db: DB): Promise<JobListing> {
    const companyIds = await getAllCompanyIDs(db);
    let companyId: string | null = companyIds[Math.floor(Math.random() * companyIds.length)];
    companyId = await getUserID(db, companyId)
    const company = companyId ? await retrieveUserByID(db, companyId) : null;
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

export async function retrieveRandomJobListingID(db: DB): Promise<string> {
    const jobListingIds = await getAllJobIDs(db);
    return jobListingIds[Math.floor(Math.random() * jobListingIds.length)];
}

export async function retrieveRandomJobIDArr(db: DB): Promise<string[]> {
    const jobIds = await getAllJobIDs(db);

    const shuffledJobIds = jobIds.sort(() => 0.5 - Math.random());

    const numJobs = Math.floor(Math.random() * 10) + 1;
    return shuffledJobIds.slice(0, numJobs);
}

//=====================================================APPLICATIONS=====================================================

async function generateApplicationListing(db: DB): Promise<Application> {
    const randomSearcher = await retrieveRandomSearcherId(db);
    const randomJobListing = await retrieveRandomJobListingID(db);

    return new Application(
        randomUUID(),
        getRandomStatus(),
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

function getRandomStatus(): string {
    const statusValues = Object.values(Status).filter((value) => typeof value === 'string');
    const randomIndex = Math.floor(Math.random() * statusValues.length);
    return statusValues[randomIndex] as string;
}


//=====================================================NOTIFICATIONS=====================================================

async function generateSearcherNotification(db: DB, searcherID: string): Promise<Notification | undefined> {
    const applications = await GetApplicationsByFilter(db, {"searcherID":searcherID});
    const userID = await getUserID(db, searcherID)

    if (!userID){
        throw new Error((`userID not found for ${searcherID}`))
    }

    if (applications.length === 0) {
        return undefined;
    }

    const content = getRandomNotificationEnum("searcher");
    const randomJobListing = applications[Math.floor(Math.random() * applications.length)];

    return {
        id: randomUUID(),
        content,
        applicationID: randomJobListing.id,
        created: faker.date.past(),
        userID: userID
    };
}

async function generateCompanyNotification(db: DB, companyID: string): Promise<Notification | undefined> {
    const jobListingsSnapshot = await db.JobListingCollection().where("companyID", "==", companyID).get();
    const jobListingIds: string[] = jobListingsSnapshot.docs.map((doc) => doc.id);
    const userID = await getUserID(db, companyID)

    if (!userID){
        throw new Error((`userID not found for ${companyID}`))
    }

    if (jobListingIds.length === 0) {
        return undefined;
    }

    const content = getRandomNotificationEnum("company");
    const jobListingID = jobListingIds[Math.floor(Math.random() * jobListingIds.length)];


    return {
        id: randomUUID(),
        content,
        applicationID: jobListingID,
        created: faker.date.past(),
        userID: userID
    };
}

export async function seedNotifications(db: DB): Promise<void> {
    const searchers = await getAllSearcherIDs(db);
    const companies = await getAllCompanyIDs(db);

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

function getRandomNotificationEnum(type: "company" | "searcher"): string {
    let enums: Record<string, string>;
    if (type == "searcher")
        enums = searcherNotification as unknown as Record<string, string>;
    else{
        enums = companyNotification as unknown as Record<string, string>;
    }

    const statusValues = Object.values(enums).filter((value) => typeof value === 'string');
    const randomIndex = Math.floor(Math.random() * statusValues.length);
    return statusValues[randomIndex] as string;
}