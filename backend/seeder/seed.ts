import DB from "../db/db";
import { faker } from '@faker-js/faker';
import JobListing from "../models/job";
import { createJobListing } from "../db/jobs";

class Seeder {
  private db: DB;

  constructor(db: DB) {
    this.db = db;
  }

  // Define a function that generates a random job listing using the faker library
  private generateJobListing(): JobListing {
    return new JobListing(
      faker.random.uuid(),
      faker.name.jobTitle(),
      faker.random.number({ min: 50000, max: 150000 }),
      faker.lorem.paragraph(),
      faker.address.city(),
      faker.random.arrayElement(["Full-time", "Part-time", "Contract"]),
      faker.company.companyName(),
      faker.random.arrayElement(["Engineering", "Sales", "Marketing", "Finance"]),
      faker.date.past(),
      [faker.lorem.words(), faker.lorem.words(), faker.lorem.words()],
      [faker.lorem.words(), faker.lorem.words(), faker.lorem.words()]
    );
  }

  // Define a function that creates a specified number of fake job listings and adds them to the database
  async seedJobListings(count: number): Promise<void> {
    for (let i = 0; i < count; i++) {
      const jobListing = this.generateJobListing();
      await createJobListing(this.db, jobListing);
    }
    console.log(`Seeded job listings`);
  }
}