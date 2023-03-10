import 'express-async-errors';
import DB from "../../db/db";
import { getErrorMessage, Handler } from "../public";
import { NextFunction, Request, Response } from "express";
import {
    SeedApplicationListings,
    SeedCompanies,
    SeedJobListings,
    SeedNotifications,
    SeedSearchers
} from "../../seeder/seed";


export function SeedAll(db: DB): Handler {
    return async (req: Request, res: Response, next: NextFunction) => {
        await SeedCompanies(db);
        await SeedJobListings(db);
        await SeedSearchers(db);
        await SeedApplicationListings(db);
        await SeedNotifications(db);
        res.status(200)
    };
}