import DB from "../db/db";
import {getErrorMessage, Handler} from "../service/public";
import {NextFunction, Request, Response} from "express";


export function deseed(db: DB): Handler {

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Delete all documents in the 'applications' collection
            await db.ApplicationCollection().get().then((snapshot) => {
                snapshot.docs.forEach(async (doc) => {
                    await doc.ref.delete();
                });
            });

            // Delete all documents in the 'jobs' collection
            await db.JobListingCollection().get().then((snapshot) => {
                snapshot.docs.forEach(async (doc) => {
                    await doc.ref.delete();
                });
            });

            await db.CompanyCollection().get().then((snapshot) => {
                snapshot.docs.forEach(async (doc) => {
                    await doc.ref.delete();
                });
            });

            await db.SearcherCollection().get().then((snapshot) => {
                snapshot.docs.forEach(async (doc) => {
                    await doc.ref.delete();
                });
            });

            // Delete all documents in the 'notifications' collection
            await db.NotificationCollection().get().then((snapshot) => {
                snapshot.docs.forEach(async (doc) => {
                    await doc.ref.delete();
                });
            });

            // Delete all documents in the 'users' collection
            await db.UserCollection().get().then((snapshot) => {
                snapshot.docs.forEach(async (doc) => {
                    await doc.ref.delete();
                });
            });

            res.status(200).json({
                message: `All collections deseeded`,
            });

            console.log('All documents deleted successfully.');
        } catch (err) {
            next({
                message: getErrorMessage(err),
            });
        }

    }

}
