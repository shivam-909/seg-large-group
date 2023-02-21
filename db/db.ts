import { CollectionReference, DocumentData, Firestore } from 'firebase-admin/firestore';
import { FirebaseServiceAccount } from '../config/config';
import { UserConverter } from '../models/user';
import {ApplicationConverter} from "../models/application";

const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

interface DB {
    UserCollection(): CollectionReference<DocumentData>;
    ApplicationCollection(): CollectionReference<DocumentData>;
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

    ApplicationCollection() {
        return this.db.collection('applications').withConverter(ApplicationConverter);
    }

}

export default DB;