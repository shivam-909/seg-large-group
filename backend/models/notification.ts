import { QueryDocumentSnapshot } from "firebase-admin/firestore";
class Notification {
    id: string;
    content: string;
    applicationID: string;
    created: Date;
    userID: string;

    constructor(id: string, content: string, application: string, created: Date, userID: string) {
        this.id = id;
        this.content = content;
        this.applicationID = application;
        this.created = created;
        this.userID = userID;
    }
}

export const NotificationConverter = {
    toFirestore: (notification: Notification) => notification,
    fromFirestore: (snapshot: QueryDocumentSnapshot) => snapshot.data() as Notification
}

export default Notification;
