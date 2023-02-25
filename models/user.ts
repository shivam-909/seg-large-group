import { QueryDocumentSnapshot } from "firebase-admin/firestore";
import JobListing from "./job";

class User {
    id: string;
    email: string;
    hashedPassword: string;
    pfpUrl: string;
    location: string;
    notifications: string[];

    constructor(id: string, email: string, hashedPassword: string, pfpUrl: string, location: string, notifications: string[]) {
        this.id = id;
        this.email = email;
        this.hashedPassword = hashedPassword;
        this.pfpUrl = pfpUrl;
        this.location = location;
        this.notifications = notifications;
    }
}

class Company extends User {
    companyName: string;

    constructor(id: string,
                companyName: string,
                email: string,
                hashedPassword: string,
                pfpUrl: string,
                location: string,
                notifications: string[])

    {
        super(id, email, hashedPassword, pfpUrl, location, notifications);
        this.companyName = companyName;
    }
}

class Searcher extends User {
    firstName: string;
    lastName: string;
    savedJobs: string[];

    constructor(id: string,
                firstName: string,
                lastName: string,
                email: string,
                hashedPassword: string,
                pfpUrl: string,
                location: string,
                savedJobs: string[],
                notifications: string[])

    {
        super(id, email, hashedPassword, pfpUrl, location, notifications);
        this.firstName = firstName;
        this.lastName = lastName;
        this.savedJobs = savedJobs;
    }
}

export const UserConverter = {
    toFirestore: (user: User) => user,
    fromFirestore: (snapshot: QueryDocumentSnapshot) => snapshot.data() as User
}

export const CompanyConverter = {
    toFirestore: (company: Company) => company,
    fromFirestore: (snapshot: QueryDocumentSnapshot) => snapshot.data() as Company
}

export const SearcherConverter = {
    toFirestore: (searcher: Searcher) => searcher,
    fromFirestore: (snapshot: QueryDocumentSnapshot) => snapshot.data() as Searcher
}

export { User, Company, Searcher };
