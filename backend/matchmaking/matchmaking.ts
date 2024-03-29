import JobListing from "../models/job";
import {Searcher} from "../models/user";
import DB from "../db/db";

export async function FindMatchesFromAllJobs(db: DB, searcherID: string): Promise<JobListing[]> {
    const jobListingsQuery = await db.JobListingCollection().get();
    const jobListings = jobListingsQuery.docs.map((doc) => doc.data() as JobListing);

    return await FindMatchesFromJLArray(db, searcherID, jobListings);
}

export async function FindMatchesFromJLArray(db: DB, searcherID: string, jobListings: JobListing[], includeNonMatches: boolean = false): Promise<JobListing[]> {
    const searcherDoc = await db.SearcherCollection().doc(searcherID).get();
    const searcher = searcherDoc.data() as Searcher;
    const matchingJobListings = jobListings
        .filter((jobListing) => {
            if (!Array.isArray(jobListing.requirements) || !Array.isArray(searcher.skills)) {
                return false;
            }

            const hasQualification = jobListing.qualifications?.some((jobListingQualification) => {
                return searcher.qualifications.some((userQualification) => {
                    return IsQualified(jobListingQualification, userQualification);
                });
            });

            const matchingSkill = jobListing.requirements?.some((requirement) => {
                return HasMatchingSkill(searcher.skills, requirement);
            });

            return hasQualification || matchingSkill;
        })
        .sort((jobListingA, jobListingB) => {
            if (!Array.isArray(jobListingA.requirements) || !Array.isArray(jobListingB.requirements) || !Array.isArray(searcher.skills)) {
                return 0;
            }

            const jobListingARequirementMatches = jobListingA.qualifications ? jobListingA.qualifications.filter((jobListingQualification: string) => searcher.qualifications.includes(jobListingQualification)).length : 0;
            const jobListingBRequirementMatches = jobListingB.qualifications ? jobListingB.qualifications.filter((jobListingQualification: string) => searcher.qualifications.includes(jobListingQualification)).length : 0;
            const jobListingASkillMatches = jobListingA.requirements.reduce((totalMatches: number, requirement: string) => {
                return totalMatches + (HasMatchingSkill(searcher.skills, requirement) ? 1 : 0);
            }, 0);
            const jobListingBSkillMatches = jobListingB.requirements.reduce((totalMatches: number, requirement: string) => {
                return totalMatches + (HasMatchingSkill(searcher.skills, requirement) ? 1 : 0);
            }, 0);
            const jobListingATotalMatches = jobListingARequirementMatches + jobListingASkillMatches;
            const jobListingBTotalMatches = jobListingBRequirementMatches + jobListingBSkillMatches;
            return jobListingBTotalMatches - jobListingATotalMatches;
        });

    if (includeNonMatches) {
        const nonMatchingJobListings = jobListings.filter((jobListing) => !matchingJobListings.includes(jobListing));
        return [...matchingJobListings, ...nonMatchingJobListings];
    } else {
        return matchingJobListings;
    }
}




function HasMatchingSkill(skills: string[], requirement: string): boolean {
    const [requirementSkill, requirementDuration, requirementUnit] = requirement.split(",");
    const requirementDurationInYears = ConvertDurationToYears(parseFloat(requirementDuration), requirementUnit);
    return skills.some((skill) => {
        const [skillName, skillDuration, skillUnit] = skill.split(",");
        const skillDurationInYears = ConvertDurationToYears(parseFloat(skillDuration), skillUnit);

        if (requirementSkill.toLowerCase() === skillName.toLowerCase() &&
            skillDurationInYears >= requirementDurationInYears) {
            console.log("Matched skill: " + skillName + " with duration: " + skillDurationInYears + " years")
        }
        return requirementSkill.toLowerCase() === skillName.toLowerCase() &&
            skillDurationInYears >= requirementDurationInYears;
    });
}

function ConvertDurationToYears(duration: number, unit: string): number {
    let convertedDuration: number;

    switch (unit) {
        case "weeks":
            convertedDuration = duration / 52;
            break;
        case "months":
            convertedDuration = duration / 12;
            break;
        default:
            convertedDuration = duration;
            break;
    }
    return convertedDuration;
}


function IsQualified(jobListingQual: string, userQual: string): boolean {
    const [jobSubject, jobLevel, jobGrade] = jobListingQual.split(",");
    const [userSubject, userLevel, userGrade] = userQual.split(",");

    if (jobSubject.toLowerCase() !== userSubject.toLowerCase() || jobLevel !== userLevel) {
        return false;
    }

    if (jobLevel === "PhD") {
        return true;
    }

    const gradePriority = GetGradePriority(userLevel);
    return gradePriority.indexOf(userGrade) <= gradePriority.indexOf(jobGrade);
}


function GetGradePriority(level: string): string[] {
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
