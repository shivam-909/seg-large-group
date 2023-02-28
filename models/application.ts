import { QueryDocumentSnapshot } from "firebase-admin/firestore";
import User from "./user";
import {Status} from "./enums/status.enum";

class Application {
    id: string;
    status: Status;
    user: User;
    //job: Job;


    constructor(id: string, status: Status, user: User) {
        this.id = id;
        this.status = status;
        this.user = user;
        //this.job = job;
    }
}

export const ApplicationConverter = {
    toFirestore: (application: Application) => application,
    fromFirestore: (snapshot: QueryDocumentSnapshot) => snapshot.data() as Application
}

export default Application;