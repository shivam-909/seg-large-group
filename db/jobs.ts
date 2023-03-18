import JobListing from "../models/job";
import DB from "./db";
import { Searcher } from "../models/user";

export async function CreateJobListing(db: DB, jobListing: JobListing): Promise<JobListing> {
  const docRef = db.JobListingCollection().doc(jobListing.id);

  try {
    await docRef.set({
      ...jobListing,
      id: jobListing.id,
    });
  } catch (err) {
    throw err;
  }

  return jobListing;
}



export async function RetrieveJobListing(db: DB, id: string): Promise<JobListing | null> {
  const docRef = db.JobListingCollection().doc(id);
  const doc = await docRef.get();

  return doc.data() as JobListing;
}

export async function UpdateJobListing(db: DB, jobListing: JobListing): Promise<void> {
  const docRef = db.JobListingCollection().doc(jobListing.id);

  const { id, ...listingData } = jobListing;

  try {
    await docRef.update(listingData);
  } catch (err) {
    throw err;
  }
}


export async function DeleteJobListing(db: DB, id: string) {
  const docRef = db.JobListingCollection().doc(id);

  await docRef.delete();
  await DeleteJobFromSaved(db, id)
}



export async function DeleteJobsByCompanyID(db: DB, companyId: string) {
  if (!companyId) {
    throw new Error('Company ID is not defined');
  }
  const jobCollectionRef = db.JobListingCollection();
  const jobsSnapshot = await jobCollectionRef.where('companyID', '==', companyId).get();
  jobsSnapshot.forEach(jobDoc => {
    DeleteJobListing(db, jobDoc.id);
  });
}




export async function DeleteJobFromSaved(db: DB, jobId: string): Promise<void> {
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

export async function GetSavedJobsForSearcher(db: DB, searcherID: string): Promise<JobListing[]> {
  const searcherDoc = await db.SearcherCollection().doc(searcherID).get();
  if (!searcherDoc.exists) {
    throw new Error(`Searcher with ID ${searcherID} not found`);
  }

  const searcher = searcherDoc.data() as Searcher;
  const savedJobs: JobListing[] = [];

  for (const savedJobID of searcher.savedJobs) {
    const savedJobDoc = await db.JobListingCollection().doc(savedJobID).get();
    if (savedJobDoc.exists) {
      savedJobs.push(savedJobDoc.data() as JobListing);
    }
  }

  return savedJobs;
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

export async function RetrieveJobListingsByFilter(db: DB, filters: any): Promise<JobListing[]> {
  let query: FirebaseFirestore.Query<FirebaseFirestore.DocumentData> = db.JobListingCollection();

  for (const [key, value] of Object.entries(filters)) {
    if (value !== null && value !== undefined && value !== '') {
      switch (key) {
        case 'id':
        case 'title':
        case 'description':
        case 'location':
        case 'type':
        case 'companyID':
        case 'industry':
          query = query.where(key, '==', value);
          break;
        case 'compensation':
          query = query.where(key, '>=', value);
          break;
        case 'datePosted':
          if (typeof value === 'string' && Date.parse(value)) {
            const startOfDay = new Date(value);
            startOfDay.setUTCHours(0, 0, 0, 0);
            const endOfDay = new Date(value);
            endOfDay.setUTCHours(23, 59, 59, 999);
            query = query.where(key, '>=', startOfDay).where(key, '<=', endOfDay);
          }
          break;
        case 'benefits':
        case 'requirements':
          query = query.where(key, 'array-contains-any', value);
          break;
      }
    }
  }

  const jobListingsSnapshot = await query.get();

  const jobListings: JobListing[] = [];

  jobListingsSnapshot.forEach((doc) => {
    const jobListing = doc.data() as JobListing;
    jobListings.push(jobListing);
  });

  return jobListings;
}









