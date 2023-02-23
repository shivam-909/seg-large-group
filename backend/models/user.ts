import { QueryDocumentSnapshot } from "firebase-admin/firestore";

class User {
    id: string;
    hashedPassword: string;
    email: string;

    constructor(id: string, hashedPassword: string, email: string) {
        this.id = id;
        this.hashedPassword = hashedPassword;
        this.email = email;
    }
}

export const UserConverter = {
    toFirestore: (user: User) => user,
    fromFirestore: (snapshot: QueryDocumentSnapshot) => snapshot.data() as User
}

export default User;