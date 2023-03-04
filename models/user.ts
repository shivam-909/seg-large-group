import { QueryDocumentSnapshot } from "firebase-admin/firestore";

class User {
    userID: string;
    email: string;
    hashedPassword: string;
    pfpUrl: string;
    location: string;
    notifications: string[];
    companyID?: string;
    searcherID?: string;


    constructor(userID: string, email: string, hashedPassword: string, pfpUrl: string, location: string, notifications: string[], searcherID?: string, companyID?: string) {
        this.userID = userID;
        this.email = email;
        this.hashedPassword = hashedPassword;
        this.pfpUrl = pfpUrl;
        this.location = location;
        this.notifications = notifications;
        this.companyID = companyID;
        this.searcherID = searcherID;
    }
}


class Company extends User {
    companyName: string;
    companyID: string;

    constructor(userID: string,
                companyName: string,
                email: string,
                hashedPassword: string,
                pfpUrl: string,
                location: string,
                notifications: string[],
                companyID: string,)

    {
        super(userID, email, hashedPassword, pfpUrl, location, notifications);
        this.companyName = companyName;
        this.companyID = companyID;
    }
}

class Searcher extends User {
    firstName: string;
    lastName: string;
    savedJobs: string[];
    searcherID: string;

    constructor(userID: string,
                firstName: string,
                lastName: string,
                email: string,
                hashedPassword: string,
                pfpUrl: string,
                location: string,
                savedJobs: string[],
                notifications: string[],
                searcherID: string,)

    {
        super(userID, email, hashedPassword, pfpUrl, location, notifications);
        this.firstName = firstName;
        this.lastName = lastName;
        this.savedJobs = savedJobs;
        this.searcherID = searcherID;
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
