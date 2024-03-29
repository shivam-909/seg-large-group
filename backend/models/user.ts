import { QueryDocumentSnapshot } from "firebase-admin/firestore";

class User {
    userID: string;
    email: string;
    hashedPassword: string;
    pfpUrl: string;
    location: string;
    notifications: string[];
    description?: string;
    companyID?: string;
    searcherID?: string;


    constructor(userID: string, email: string, hashedPassword: string, pfpUrl: string, location: string, notifications: string[], description?: string, searcherID?: string, companyID?: string) {
        this.userID = userID;
        this.email = email;
        this.hashedPassword = hashedPassword;
        this.pfpUrl = pfpUrl;
        this.location = location;
        this.notifications = notifications;
        this.description = description;
        this.companyID = companyID;
        this.searcherID = searcherID;
    }
}

// Contains either the company object or the searcher object
class UserExpanded extends User {
    company?: Company;
    searcher?: Searcher;

    constructor(
        userID: string,
        email: string,
        hashedPassword: string,
        pfpUrl: string,
        location: string,
        notifications: string[],
        description?: string,
        searcherID?: string,
        companyID?: string,
        company?: Company,
        searcher?: Searcher) {
        super(userID, email, hashedPassword, pfpUrl, location, notifications, description, searcherID, companyID);
        this.company = company;
        this.searcher = searcher;
    }

    static fromUser(user: User, company?: Company, searcher?: Searcher): UserExpanded {
        return new UserExpanded(
            user.userID,
            user.email,
            user.hashedPassword,
            user.pfpUrl,
            user.location,
            user.notifications,
            user.description,
            user.searcherID,
            user.companyID,
            company,
            searcher
        );
    }
}


class Company {
    companyName: string;
    companyID: string;

    constructor(
        companyName: string,
        companyID: string,) {
        this.companyName = companyName;
        this.companyID = companyID;
    }
}

class Searcher {
    firstName: string;
    lastName: string;
    savedJobs: string[];
    searcherID: string;
    skills: string[];
    qualifications: string[];
    cv: string[];

    constructor(
        firstName: string,
        lastName: string,
        savedJobs: string[],
        searcherID: string,
        skills: string[],
        qualifications: string[],
        cv: string[],) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.savedJobs = savedJobs;
        this.searcherID = searcherID;
        this.skills = skills;
        this.qualifications = qualifications;
        this.cv = cv;
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

export { User, Company, Searcher, UserExpanded };
