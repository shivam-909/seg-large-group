import { CollectionReference, DocumentData, Firestore } from 'firebase-admin/firestore';
import { FirebaseServiceAccount } from '../config/config';
import { UserConverter } from '../models/user';

const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

interface DB {
    UserCollection(): CollectionReference<DocumentData>;
}

class DB {
    db: Firestore;

    constructor() {
        initializeApp(FirebaseServiceAccount);

        this.db = getFirestore();
    }

    UserCollection() {
        return this.db.collection('users').withConverter(UserConverter);
    }
}

export default DB;