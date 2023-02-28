import DB from "../../db/db";
import {getErrorMessage, Handler} from "../public";
import {NextFunction, Request, Response} from "express";
import {seedApplicationListings, seedCompanies, seedJobListings, seedSearchers} from "../../seeder/seed";


export function seedAllRoute(db: DB): Handler {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await seedCompanies(db);
            await seedJobListings(db);
            await seedSearchers(db);
            await seedApplicationListings(db);
            res.status(200).json({
                message: 'All data seeded successfully'
            });
        } catch (err) {
            next({
                message: getErrorMessage(err),
            });
        }
    };
}