import DB from "../db/db";
import {faker} from '@faker-js/faker';
import JobListing from "../models/job";
import {createJobListing, retrieveJobListing} from "../db/jobs";
import {CreateUser} from "../db/users";
import User from "../models/user";
import {randomUUID} from "crypto";


export async function seedJobListings(db: DB): Promise<void> {
  for (let i = 0; i < 20; i++) {
    const jobListing = generateJobListing();
    await createJobListing(db, jobListing);
  }
  console.log(`Seeded job listings`);
}

function generateJobListing(): JobListing {
    return new JobListing(
        randomUUID(),
        faker.name.jobTitle(),
        faker.datatype.number({
            'min': 30000,
            'max': 100000
        }),
        faker.lorem.paragraph(),
        faker.address.city(),
        faker.helpers.arrayElement(["Full-time", "Part-time", "Contract"]),
        faker.company.name(),
        faker.helpers.arrayElement(["Engineering", "Sales", "Marketing", "Finance"]),
        faker.date.past(),
        [faker.lorem.words(), faker.lorem.words(), faker.lorem.words()],
        [faker.lorem.words(), faker.lorem.words(), faker.lorem.words()]
    );
}

export async function GetAllJobIDs(db: DB): Promise<string[]> {
    const snapshot = await db.JobListingCollection().get();
    const jobIds: string[] = [];

    snapshot.forEach(doc => {
        const jobId = doc.id;
        jobIds.push(jobId);
    });

    return jobIds;
}
export async function RetrieveRandomJobs(db: DB): Promise<JobListing[]> {
    const jobIds = await GetAllJobIDs(db);

    const shuffledJobIds = jobIds.sort(() => 0.5 - Math.random());

    const randomJobIds = shuffledJobIds.slice(0, 10);

    return await Promise.all(randomJobIds.map(async (jobId) => {
        const jobListing = await retrieveJobListing(db, jobId);
        if (jobListing) {
            return jobListing;
        } else {
            throw new Error(`JobListing with id ${jobId} does not exist`);
        }
    }));
}


async function generateUser(db: DB): Promise<User> {
    const isCompany = faker.datatype.boolean();
    const savedJobs = isCompany ? [] : await RetrieveRandomJobs(db);

    return new User(
        randomUUID(),
        faker.name.firstName(),
        faker.name.lastName(),
        faker.internet.email(),
        faker.internet.password(),
        isCompany,
        isCompany ? faker.company.name() : '',
        faker.image.avatar(),
        faker.address.city(),
        savedJobs,
        [faker.lorem.words(), faker.lorem.words(), faker.lorem.words()]
    );
}


export async function seedUsers(db: DB): Promise<void> {
    for (let i = 0; i < 20; i++) {
        const user = await generateUser(db);
        await CreateUser(db, user);
    }
    console.log(`Seeded users`);
}




