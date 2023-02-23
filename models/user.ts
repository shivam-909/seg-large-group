import { QueryDocumentSnapshot } from "firebase-admin/firestore";

class User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    hashedPassword: string;
    isCompany: boolean;
    companyName: string;
    pfpUrl: string;
    location: string;
    savedJobs: string[];
    notifications: string[];

    constructor(id: string, firstName: string, lastName: string, email: string, hashedPassword: string, isCompany: boolean, companyName: string, pfpUrl: string, location: string, savedJobs: string[], notifications: string[]) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.hashedPassword = hashedPassword;
        this.isCompany = isCompany;
        this.companyName = companyName;
        this.pfpUrl = pfpUrl;
        this.location = location;
        this.savedJobs = savedJobs;
        this.notifications = notifications;
    }
}

export const UserConverter = {
    toFirestore: (user: User) => user,
    fromFirestore: (snapshot: QueryDocumentSnapshot) => snapshot.data() as User
}

export default User;