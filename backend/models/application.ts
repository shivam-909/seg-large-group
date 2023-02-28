import { QueryDocumentSnapshot } from "firebase-admin/firestore";
import {User} from "./user";
import {Status} from "./enums/status.enum";
import JobListing from "./job";

class Application {
    id: string;
    status: Status;
    searcher: string;
    jobListing: string;


    constructor(id: string, status: Status, searcher: string, jobListing: string) {
        this.id = id;
        this.status = status;
        this.searcher = searcher;
        this.jobListing = jobListing;
    }
}

export const ApplicationConverter = {
    toFirestore: (application: Application) => application,
    fromFirestore: (snapshot: QueryDocumentSnapshot) => snapshot.data() as Application
}

export default Application;