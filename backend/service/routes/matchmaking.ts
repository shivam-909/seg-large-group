import 'express-async-errors';
import { NextFunction, Request, Response } from "express";
import DB from "../../db/db";
import { Handler } from "../public";
import {FindMatchesFromAllJobs } from "../../matchmaking/matchmaking";
import {RetrieveFullUserByID} from "../../db/users";


export function FindMatchingJobs(db: DB): Handler {
    return async (req: Request, res: Response, next: NextFunction) => {
        const userID = req.headers.auth_username as string;
        const user = await RetrieveFullUserByID(db, userID)
        const searcherID = user!.searcherID!;
        const jobListings = await FindMatchesFromAllJobs(db, searcherID);

        res.status(200).json(jobListings);
    };
}

