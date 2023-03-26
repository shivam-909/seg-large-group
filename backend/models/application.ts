import { QueryDocumentSnapshot } from "firebase-admin/firestore";

class Application {
    id: string;
    status: string;
    searcher: string;
    jobListing: string;
    cv: string[];
    coverLetter: string;
    QnAs: Record<string, string>;


    constructor(id: string, status: string, searcher: string, jobListing: string, cv: string[], coverLetter: string, QnAs: Record<string,string>) {
        this.id = id;
        this.status = status;
        this.searcher = searcher;
        this.jobListing = jobListing;
        this.cv = cv;
        this.coverLetter = coverLetter;
        this.QnAs = QnAs;
    }
}

export const ApplicationConverter = {
    toFirestore: (application: Application) => application,
    fromFirestore: (snapshot: QueryDocumentSnapshot) => snapshot.data() as Application
}

export default Application;