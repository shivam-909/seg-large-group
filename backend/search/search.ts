import DB from "../db/db";
import JobListing from "../models/job";
import {FindMatchesFromJLArray} from "../matchmaking/matchmaking";

function boyerMoore(term: string, query: string): number {
    const m = query.length;
    const n = term.length;

    if (m === 0) {
        return 0;
    }

    const last = new Array<number>(256);
    for (let i = 0; i < 256; i++) {
        last[i] = -1;
    }

    for (let i = 0; i < m; i++) {
        last[query.charCodeAt(i)] = i;
    }

    let i = m - 1;
    let j = m - 1;

    while (i < n) {
        if (term[i] === query[j]) {
            if (j === 0) {
                return i;
            }
            i--;
            j--;
        } else {
            i += m - Math.min(j, 1 + last[term.charCodeAt(i)]);
            j = m - 1;
        }
    }

    return -1;
}


export async function FindJobListingsByQuery(db: DB, query: string): Promise<JobListing[]> {
    const jobListingsRef = db.JobListingCollection();
    const jobListingsSnapshot = await jobListingsRef.get();
    const results: JobListing[] = [];
    const seenIds = new Set<string>();

    jobListingsSnapshot.forEach((doc) => {
        const jobListing = doc.data();
        const title = jobListing.title?.toLowerCase();
        const description = jobListing.description?.toLowerCase();
        const industry = jobListing.industry?.toLowerCase();
        const requirements = Array.isArray(jobListing.requirements) ? jobListing.requirements.map((r) => r.split(",")[0].toLowerCase()) : undefined;
        const queryLength = query.length;

        [title, description, industry, ...(requirements ?? [])].forEach((textToSearch) => {
            if (!textToSearch) {
                return;
            }
            const textLength = textToSearch.length;
            if (textLength >= queryLength) {
                const index = boyerMoore(textToSearch, query);
                if (index >= 0 && !seenIds.has(jobListing.id)) {
                    results.push(jobListing);
                    seenIds.add(jobListing.id);
                }
            }
        });
    });
    return results;
}




export async function MatchmadeSearch(db: DB, query: string, searcherID:string): Promise<JobListing[]> {
    const results = await FindJobListingsByQuery(db, query)
    return FindMatchesFromJLArray(db, searcherID, results, true);
}

