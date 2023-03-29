import JobListing from "../models/job";
import {Searcher} from "../models/user";
import DB from "../db/db";

export async function getJobListingsForSearcher(db: DB, searcherId: string): Promise<JobListing[]> {
    const searcherDoc = await db.SearcherCollection().doc(searcherId).get();

    const searcher = searcherDoc.data() as Searcher;

    const jobListingsQuery = await db.JobListingCollection().get();

    return jobListingsQuery.docs
        .map((doc) => doc.data() as JobListing)
        .filter((jobListing) => {
            return jobListing.qualifications.some((jobListingQualification) => {
                return searcher.qualifications.some((userQualification) => {
                    return isQualified(jobListingQualification, userQualification);
                });
            });
        })
        .sort((jobListingA, jobListingB) => {
            const jobListingAMatches = jobListingA.qualifications.filter((jobListingQualification: string) => searcher.qualifications.includes(jobListingQualification)).length;
            const jobListingBMatches = jobListingB.qualifications.filter((jobListingQualification: string) => searcher.qualifications.includes(jobListingQualification)).length;
            return jobListingBMatches - jobListingAMatches;
        });
}


function isQualified(jobListingQual: string, userQual: string): boolean {
    const [jobSubject, jobLevel, jobGrade] = jobListingQual.split(", ");
    const [userSubject, userLevel, userGrade] = userQual.split(", ");

    if (jobSubject !== userSubject || jobLevel !== userLevel) {
        return false;
    }

    if (jobLevel === "PhD") {
        return true;
    }

    const gradePriority = getGradePriority(userLevel);
    return gradePriority.indexOf(userGrade) <= gradePriority.indexOf(jobGrade);
}


function getGradePriority(level: string): string[] {
    switch (level) {
        case "Bachelors":
            return ["1st", "2:1", "2:2", "3rd"];
        case "Masters":
            return ["Distinction", "Merit", "Pass"];
        case "GCSE":
        case "A Level":
            return ["A", "B", "C", "D", "E", "F"];
        default:
            return [];
    }
}
