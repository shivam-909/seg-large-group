import { CollectionReference, DocumentData, Firestore } from 'firebase-admin/firestore';
import { FirebaseServiceAccount } from '../config/config';
import {UserConverter, SearcherConverter, CompanyConverter} from '../models/user';
import { JobListingConverter } from '../models/job';
import Notification, {NotificationConverter} from "../models/notification";
import {ApplicationConverter} from "../models/application";


const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

interface DB {
    UserCollection(): CollectionReference<DocumentData>;
    JobListingCollection(): CollectionReference<DocumentData>;
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

    JobListingCollection() {
        return this.db.collection('jobs').withConverter(JobListingConverter);
    }

    SearcherCollection() {
        return this.db.collection('searcher').withConverter(SearcherConverter);
    }

    CompanyCollection() {
        return this.db.collection('company').withConverter(CompanyConverter);
    }

    NotificationCollection() {
        return this.db.collection('notification').withConverter(NotificationConverter);
    }

    ApplicationCollection() {
        return this.db.collection('application').withConverter(ApplicationConverter);
    }

}

export default DB;