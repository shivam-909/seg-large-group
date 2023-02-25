import JobListing from "../models/job";
import DB from "./db";
import {WriteResult} from "@google-cloud/firestore";
import job from "../models/job";

export async function createJobListing(db: DB, jobListing: JobListing): Promise<JobListing> {
  const docRef = db.JobListingCollection().doc(jobListing.id);

  await docRef.set({
    id: jobListing.id,
    title: jobListing.title,
    compensation: jobListing.compensation,
    description: jobListing.description,
    location: jobListing.location,
    schedule: jobListing.schedule,
    companyID: jobListing.companyID,
    type: jobListing.type,
    datePosted: jobListing.datePosted,
    benefits: jobListing.benefits,
    requirements: jobListing.requirements,
  });

  return jobListing;
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
      companyID: jobListing.companyID,
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
  await deleteJobFromSaved(db, id)
}

export async function deleteJobsByCompanyID(db: DB, companyId: string) {
  if (!companyId) {
    throw new Error('Company ID is not defined');
  }
  const jobCollectionRef = db.JobListingCollection();
  const jobsSnapshot = await jobCollectionRef.where('companyID', '==', companyId).get();
  jobsSnapshot.forEach(jobDoc => {
    console.log(jobDoc.id)
    deleteJobListing(db, jobDoc.id);
  });
}


export async function deleteJobFromSaved(db: DB, jobId: string): Promise<void> {
  const searcherCollection = db.SearcherCollection();
  const snapshot = await searcherCollection.get();
  const updates = snapshot.docs.map(async (doc) => {
    const searcherData = doc.data();
    const savedJobs = searcherData.savedJobs || [];
    if (savedJobs.includes(jobId)) {
      const newSavedJobs = savedJobs.filter((id) => id !== jobId);
      await searcherCollection.doc(doc.id).update({ savedJobs: newSavedJobs });
    }
  });
  await Promise.all(updates);
}



