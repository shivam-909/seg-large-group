import 'express-async-errors';
import { NextFunction, Request, Response } from "express";
import DB from "../../db/db";
import { Handler } from "../public";
import {getJobListingsForSearcher } from "../../matchmaking/matchmaking";


export function getJobListingsForSearcherRoute(db: DB): Handler {
    return async (req: Request, res: Response, next: NextFunction) => {
        const searcherId = req.params.id;
        const jobListings = await getJobListingsForSearcher(db, searcherId);

        res.status(200).json(jobListings);
    };
}