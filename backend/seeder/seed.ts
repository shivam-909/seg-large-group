import DB from "../db/db";
import { faker } from '@faker-js/faker';
import JobListing from "../models/job";
import { createJobListing } from "../db/jobs";

class Seeder {
  private readonly db: DB;

  constructor(db: DB) {
    this.db = db;
  }

  // Define a function that generates a random job listing using the faker library
  private generateJobListing(): JobListing {
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

  // Define a function that creates a specified number of fake job listings and adds them to the database
  async seedJobListings(): Promise<void> {
    for (let i = 0; i < 20; i++) {
      const jobListing = this.generateJobListing();
      await createJobListing(this.db, jobListing);
    }
    console.log(`Seeded job listings`);
  }
}