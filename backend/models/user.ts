import { QueryDocumentSnapshot } from "firebase-admin/firestore";

class User {
    username: string;
    hashedPassword: string;
    email: string;

    constructor(username: string, hashedPassword: string, email: string) {
        this.username = username;
        this.hashedPassword = hashedPassword;
        this.email = email;
    }
}

export const UserConverter = {
    toFirestore: (user: User) => user,
    fromFirestore: (snapshot: QueryDocumentSnapshot) => snapshot.data() as User

}

export default User;