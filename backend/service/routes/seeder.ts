import DB from "../../db/db";
import {Handler} from "../public";
import {NextFunction, Request, Response} from "express";
import {seedCompanies, seedJobListings, seedSearchers} from "../../seeder/seed";

export function SeedJobs(db: DB): Handler {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await seedJobListings(db);
            res.status(200).json({
                message: 'Job listings seeded successfully'
            });
        } catch (err) {
            next(err);
        }
    };
}

export function SeedCompanies(db: DB): Handler {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await seedCompanies(db);
            res.status(200).json({
                message: 'Users seeded successfully'
            });
        } catch (err) {
            next(err);
        }
    };
}

export function SeedSearchers(db: DB): Handler {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await seedSearchers(db);
            res.status(200).json({
                message: 'Searchers seeded successfully'
            });
        } catch (err) {
            next(err);
        }
    };
}

export function SeedAll(db: DB): Handler {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await seedCompanies(db);
            await seedJobListings(db);
            await seedSearchers(db);
            res.status(200).json({
                message: 'All data seeded successfully'
            });
        } catch (err) {
            next(err);
        }
    };
}