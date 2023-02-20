import { QueryDocumentSnapshot } from "firebase-admin/firestore";

class User {

    username: string;
    email: string;
    hashedPassword: string;

    constructor(username: string, email: string, hashedPassword: string) {
        this.username = username;
        this.email = email;
        this.hashedPassword = hashedPassword;
    }
}

export const UserConverter = {
    toFirestore: (user: User) => user,
    fromFirestore: (snapshot: QueryDocumentSnapshot) => snapshot.data() as User

}

export default User;