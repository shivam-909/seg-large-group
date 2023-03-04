import {QueryDocumentSnapshot} from "firebase-admin/firestore";

class JobListing {
  id: string;
  title: string;
  compensation: number;
  description: string;
  location: string;
  schedule: string;
  companyID: string;
  type: string;
  datePosted: Date;
  benefits: string[];
  requirements: string[];

  constructor(
    id: string,
    title: string,
    compensation: number,
    description: string,
    location: string,
    schedule: string,
    companyID: string,
    type: string,
    datePosted: Date,
    benefits: string[],
    requirements: string[]
  ) {
    this.id = id;
    this.title = title;
    this.compensation = compensation;
    this.description = description;
    this.location = location;
    this.schedule = schedule;
    this.companyID = companyID;
    this.type = type;
    this.datePosted = datePosted;
    this.benefits = benefits;
    this.requirements = requirements;
  }
}

export const JobListingConverter = {
  toFirestore: (jobListing: JobListing) => jobListing,
  fromFirestore: (snapshot: QueryDocumentSnapshot) => snapshot.data() as JobListing
}

export default JobListing;