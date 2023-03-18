import {QueryDocumentSnapshot} from "firebase-admin/firestore";

class JobListing {
  id: string;
  title: string;
  compensation: number;
  description: string;
  location: string;
  schedule: string;
  companyID: string;
  industry: string;
  datePosted: Date;
  benefits?: string[];
  requirements?: string[];
  screeningQuestions?: {};

  constructor(
    id: string,
    title: string,
    compensation: number,
    description: string,
    location: string,
    schedule: string,
    companyID: string,
    industry: string,
    datePosted: Date,
    benefits?: string[],
    requirements?: string[],
    screeningQuestions?: {}
) {
    this.id = id;
    this.title = title;
    this.compensation = compensation;
    this.description = description;
    this.location = location;
    this.schedule = schedule;
    this.companyID = companyID;
    this.industry = industry;
    this.datePosted = datePosted;
    this.benefits = benefits;
    this.requirements = requirements;
    this.screeningQuestions = screeningQuestions;
  }
}

export const JobListingConverter = {
  toFirestore: (jobListing: JobListing) => jobListing,
  fromFirestore: (snapshot: QueryDocumentSnapshot) => snapshot.data() as JobListing
}

export default JobListing;
