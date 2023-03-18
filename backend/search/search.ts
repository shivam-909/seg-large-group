import DB from "../db/db";

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

export async function findJobListingsByQuery(db: DB, query:string) {
    const jobListingsRef = db.JobListingCollection();
    const jobListingsSnapshot = await jobListingsRef.get();
    const results: any[] = [];

    jobListingsSnapshot.forEach((doc) => {
        const jobListing = doc.data();
        const title = jobListing.title.toLowerCase();
        const titleLength = title.length;
        const queryLength = query.length;
        if (titleLength >= queryLength) {
            const index = boyerMoore(title, query);
            if (index >= 0) {
                results.push(jobListing);
            }
        }
    });

    return results;
}