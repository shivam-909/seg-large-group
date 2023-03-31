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
            const hasQualification = jobListing.qualifications.some((jobListingQualification) => {
                return searcher.qualifications.some((userQualification) => {
                    return isQualified(jobListingQualification, userQualification);
                });
            });

            const matchingSkill = jobListing.requirements && jobListing.requirements.some((requirement) => {
                return hasMatchingSkill(searcher.skills, requirement);
            });

            return hasQualification || matchingSkill;
        })

        .sort((jobListingA, jobListingB) => {
            const jobListingARequirementMatches = jobListingA.qualifications.filter((jobListingQualification: string) => searcher.qualifications.includes(jobListingQualification)).length;
            const jobListingBRequirementMatches = jobListingB.qualifications.filter((jobListingQualification: string) => searcher.qualifications.includes(jobListingQualification)).length;
            const jobListingASkillMatches = jobListingA.requirements ? jobListingA.requirements.reduce((totalMatches: number, requirement: string) => {
                return totalMatches + (hasMatchingSkill(searcher.skills, requirement) ? 1 : 0);
            }, 0) : 0;
            const jobListingBSkillMatches = jobListingB.requirements ? jobListingB.requirements.reduce((totalMatches: number, requirement: string) => {
                return totalMatches + (hasMatchingSkill(searcher.skills, requirement) ? 1 : 0);
            }, 0) : 0;
            const jobListingATotalMatches = jobListingARequirementMatches + jobListingASkillMatches;
            const jobListingBTotalMatches = jobListingBRequirementMatches + jobListingBSkillMatches;
            return jobListingBTotalMatches - jobListingATotalMatches;
        });

}

function hasMatchingSkill(skills: string[], requirement: string): boolean {
    const [requirementSkill, requirementDuration, requirementUnit] = requirement.split(", ");
    const requirementDurationInYears = convertDurationToYears(parseFloat(requirementDuration), requirementUnit);
    return skills.some((skill) => {
        const [skillName, skillDuration, skillUnit] = skill.split(", ");
        const skillDurationInYears = convertDurationToYears(parseFloat(skillDuration), skillUnit);
        return requirementSkill.toLowerCase() === skillName.toLowerCase() &&
            skillDurationInYears >= requirementDurationInYears;
    });
}

function convertDurationToYears(duration: number, unit: string): number {
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




function isQualified(jobListingQual: string, userQual: string): boolean {
    const [jobSubject, jobLevel, jobGrade] = jobListingQual.split(", ");
    const [userSubject, userLevel, userGrade] = userQual.split(", ");

    if (jobSubject.toLowerCase() !== userSubject.toLowerCase() || jobLevel !== userLevel) {
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
