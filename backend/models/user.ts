import { QueryDocumentSnapshot } from "firebase-admin/firestore";

class User {
    id: string;

    constructor(id: string) {
        this.id = id;
    }
}

export const UserConverter = {
    toFirestore: (user: User) => user,
    fromFirestore: (snapshot: QueryDocumentSnapshot) => snapshot.data() as User

}

export default User;