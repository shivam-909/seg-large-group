import { CollectionReference, DocumentData, Firestore } from 'firebase-admin/firestore';
import { FirebaseServiceAccount } from '../config/config';
import { UserConverter } from '../models/user';
import { JobListingConverter } from '../models/job';

const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

interface DB {
    UserCollection(): CollectionReference<DocumentData>;
}

class DB {
    db: Firestore;

    constructor() {
        initializeApp({
            credential: cert(FirebaseServiceAccount),
        });

        this.db = getFirestore();
    }

    UserCollection() {
        return this.db.collection('users').withConverter(UserConverter);
    }

    JobListingCollection() {
        return this.db.collection('jobs').withConverter(JobListingConverter);
    }
}

export default DB;