import { QueryDocumentSnapshot } from "firebase-admin/firestore";
class Notification {
    id: string;
    content: string;
    application: string;
    created: Date;
    companyID?: string;
    searcherID?: string;

    constructor(id: string, content: string, application: string, created: Date, companyID?: string, searcherID?: string) {
        this.id = id;
        this.content = content;
        this.application = application;
        this.created = created;
        this.companyID = companyID;
        this.searcherID = searcherID;
    }
}

export const NotificationConverter = {
    toFirestore: (notification: Notification) => notification,
    fromFirestore: (snapshot: QueryDocumentSnapshot) => snapshot.data() as Notification
}

export default Notification;
