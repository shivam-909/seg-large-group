import { QueryDocumentSnapshot } from "firebase-admin/firestore";
import {companyNotification, searcherNotification} from "./enums/userNotification.enum";
class Notification {
    id: string;
    content: searcherNotification | companyNotification;
    joblisting: string;
    created: Date;

    constructor(id: string, content: searcherNotification | companyNotification, jobListing: string, created: Date) {
        this.id = id;
        this.content = content;
        this.joblisting = jobListing;
        this.created = created;
    }
}

export const NotificationConverter = {
    toFirestore: (notification: Notification) => notification,
    fromFirestore: (snapshot: QueryDocumentSnapshot) => snapshot.data() as Notification
}

export default Notification;
