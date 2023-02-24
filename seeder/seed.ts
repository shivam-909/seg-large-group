import DB from "../db/db";
import {faker} from '@faker-js/faker';
import JobListing from "../models/job";
import {createJobListing, retrieveJobListing} from "../db/jobs";
import {CreateCompany, CreateSearcher, RetrieveCompanyById, UpdateCompany} from "../db/users";
import { Searcher, Company} from "../models/user";
import {randomUUID} from "crypto";



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
    const snapshot = await db.CompanyCollection().get();
    const companyIds: string[] = [];

    snapshot.forEach(doc => {
        const companyId = doc.id;
        companyIds.push(companyId);
    });

    return companyIds;
}

export async function RetrieveRandomJobs(db: DB): Promise<JobListing[]> {
    const jobIds = await GetAllJobIDs(db);

    const shuffledJobIds = jobIds.sort(() => 0.5 - Math.random());

    const numJobs = Math.floor(Math.random() * 10) + 1;
    const randomJobIds = shuffledJobIds.slice(0, numJobs);

    return await Promise.all(
        randomJobIds.map(async (jobId) => {
            const jobListing = await retrieveJobListing(db, jobId);
            if (jobListing) {
                return jobListing;
            } else {
                throw new Error(`JobListing with id ${jobId} does not exist`);
            }
        })
    );
}


async function generateCompany(db: DB): Promise<Company> {
    const jobsAvailArr: JobListing[] = [];
    const companyName = faker.company.name();
    const email = `support@${companyName.toLowerCase().replace(/[^a-zA-Z0-9]/g, '')}.${faker.internet.domainSuffix()}`;



    return new Company(
        randomUUID(),
        companyName,
        email,
        faker.internet.password(),
        faker.image.avatar(),
        faker.address.city(),
        [faker.lorem.words(), faker.lorem.words(), faker.lorem.words()],
        jobsAvailArr
    );
}

async function generateSearcher(db: DB): Promise<Searcher> {
    const savedJobs = await RetrieveRandomJobs(db);
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const email = faker.internet.email(firstName, lastName);


    return new Searcher(
        randomUUID(),
        firstName,
        lastName,
        email,
        faker.internet.password(),
        faker.image.avatar(),
        faker.address.city(),
        savedJobs,
        [faker.lorem.words(), faker.lorem.words(), faker.lorem.words()]
    );
}

async function generateJobListing(db: DB): Promise<JobListing> {
    const companyIds = await GetAllCompanyIDs(db);
    const companyId = companyIds[Math.floor(Math.random() * companyIds.length)];
    const company = await RetrieveCompanyById(db, companyId);

    if (!company) {
        throw new Error('Company not found');
    }

    const jobListing = new JobListing(
        randomUUID(),
        faker.name.jobTitle(),
        faker.datatype.number({
            'min': 30000,
            'max': 100000
        }),
        faker.lorem.paragraph(),
        company.location,
        faker.helpers.arrayElement(["Full-time", "Part-time", "Contract"]),
        company.companyName,
        faker.helpers.arrayElement(["Engineering", "Sales", "Marketing", "Finance"]),
        faker.date.past(),
        [faker.lorem.words(), faker.lorem.words(), faker.lorem.words()],
        [faker.lorem.words(), faker.lorem.words(), faker.lorem.words()]
    );

    company.jobsAvail.push(jobListing);
    await UpdateCompany(db, company);

    return jobListing;
}


export async function seedCompanies(db: DB): Promise<void> {
    const numCompanies = 20;

    const companyPromises: Promise<Company>[] = [];
    for (let i = 0; i < numCompanies; i++) {
        companyPromises.push(generateCompany(db));
    }

    const companies = await Promise.all(companyPromises);

    const createPromises: Promise<void>[] = [];
    for (const company of companies) {
        createPromises.push(CreateCompany(db, company));
    }

    await Promise.all(createPromises);
    console.log(`Seeded companies`);
}

export async function seedSearchers(db: DB): Promise<void> {
    const numSearchers = 50;

    const searcherPromises: Promise<Searcher>[] = [];
    for (let i = 0; i < numSearchers; i++) {
        searcherPromises.push(generateSearcher(db));
    }

    const searchers = await Promise.all(searcherPromises);

    const createPromises: Promise<void>[] = [];
    for (const searcher of searchers) {
        createPromises.push(CreateSearcher(db, searcher));
    }

    await Promise.all(createPromises);
    console.log(`Seeded searchers`);
}


export async function seedJobListings(db: DB): Promise<void> {
    const numListings = 15;

    for (let i = 0; i < numListings; i++) {
        const jobListing = await generateJobListing(db);
        await createJobListing(db, jobListing);
    }
    console.log(`Seeded job listings`);
}


