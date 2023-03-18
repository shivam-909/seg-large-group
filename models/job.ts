import {QueryDocumentSnapshot} from "firebase-admin/firestore";

class JobListing {
  id: string;
  title: string;
  compensation: string[];
  description: string;
  location: string;
  schedule: string;
  companyID: string;
  industry: string;
  coverLetterRequired: boolean;
  urgent: boolean;
  qualifications: string[];
  datePosted: Date;
  benefits?: string[];
  requirements?: string[];
  screeningQuestions?: Record<string,boolean>;


  constructor(
    id: string,
    title: string,
    compensation: string[],
    description: string,
    location: string,
    schedule: string,
    companyID: string,
    industry: string,
    coverLetterRequired: boolean,
    urgent:boolean,
    qualifications: string[],
    datePosted: Date,
    benefits?: string[],
    requirements?: string[],
    screeningQuestions?: Record<string, boolean>,
) {
    this.id = id;
    this.title = title;
    this.compensation = compensation;
    this.description = description;
    this.location = location;
    this.schedule = schedule;
    this.companyID = companyID;
    this.industry = industry;
    this.coverLetterRequired = coverLetterRequired;
    this.urgent = urgent;
    this.datePosted = datePosted;
    this.benefits = benefits;
    this.requirements = requirements;
    this.screeningQuestions = screeningQuestions;
    this.qualifications = qualifications;
  }
}

export const JobListingConverter = {
  toFirestore: (jobListing: JobListing) => jobListing,
  fromFirestore: (snapshot: QueryDocumentSnapshot) => snapshot.data() as JobListing
}

export default JobListing;
