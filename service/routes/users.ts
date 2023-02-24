import DB from "../../db/db";
import {Handler} from "../public";
import {NextFunction, Request, Response} from "express";
import {seedUsers} from "../../seeder/seed";

export function SeedUsers(db: DB): Handler {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await seedUsers(db);
            res.status(200).json({
                message: 'Users seeded successfully'
            });
        } catch (err) {
            next(err);
        }
    };
}