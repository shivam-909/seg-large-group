import DB from "../db/db";
import { faker } from '@faker-js/faker';
import JobListing from "../models/job";
import { createJobListing } from "../db/jobs";

function generateJobListing(): JobListing {
  return new JobListing(
      faker.datatype.uuid(),
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

export async function seedJobListings(db: DB): Promise<void> {
  for (let i = 0; i < 20; i++) {
    const jobListing = generateJobListing();
    await createJobListing(db, jobListing);
  }
  console.log(`Seeded job listings`);
}
