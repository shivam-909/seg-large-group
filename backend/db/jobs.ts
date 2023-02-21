import JobListing from "../models/job";
import DB from "./db";

export async function createJobListing(db: DB, jobListing: JobListing) {
  const docRef = db.JobListingCollection().doc(jobListing.id);

  await docRef.set({
    id: jobListing.id,
    title: jobListing.title,
    compensation: jobListing.compensation,
    description: jobListing.description,
    location: jobListing.location,
    schedule: jobListing.schedule,
    companyName: jobListing.companyName,
    type: jobListing.type,
    datePosted: jobListing.datePosted,
    benefits: jobListing.benefits,
    requirements: jobListing.requirements,
  });
}

export async function retrieveJobListing(db: DB, id: string): Promise<JobListing | null> {
  const docRef = db.JobListingCollection().doc(id);
  const doc = await docRef.get();
  if (doc.exists) {
    return doc.data() as JobListing;
  } 
  else {
    return null
  }
}

export async function updateJobListing(db: DB, jobListing: JobListing): Promise<void> {
  const docRef = db.JobListingCollection().doc(jobListing.id);

  try {
    await docRef.update({
      title: jobListing.title,
      compensation: jobListing.compensation,
      description: jobListing.description,
      location: jobListing.location,
      schedule: jobListing.schedule,
      companyName: jobListing.companyName,
      type: jobListing.type,
      datePosted: jobListing.datePosted,
      benefits: jobListing.benefits,
      requirements: jobListing.requirements,
    });
  } catch (err) {
    throw err;
  }
}

export async function deleteJobListing(db: DB, id: string) {
  const docRef = db.JobListingCollection().doc(id);

  await docRef.delete();
}