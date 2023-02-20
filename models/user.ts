import { QueryDocumentSnapshot } from "firebase-admin/firestore";

class User {
    first_name: string;
    last_name: string;
    date_of_birth: Date;
    email: string;
    hashedPassword: string;
    is_company: {
        type: boolean,
        default: false
    };
    company_name: string;
    location: string;
    pfp_url: string;
    saved_jobs: string[];
    notifications: string[];

    constructor(id: string, email: string, hashedPassword: string) {
        this.email = email;
        this.hashedPassword = hashedPassword;
    }
}

export const UserConverter = {
    toFirestore: (user: User) => user,
    fromFirestore: (snapshot: QueryDocumentSnapshot) => snapshot.data() as User

}

export default User;