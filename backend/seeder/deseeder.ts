import DB from "../db/db";
import { getErrorMessage, Handler } from "../service/public";
import { NextFunction, Request, Response } from "express";


export async function deseed(db: DB) {

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

    } catch (err) {
        throw new Error(getErrorMessage(err));
    }
}
