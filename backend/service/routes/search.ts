import { NextFunction, Request, Response } from "express";
import 'express-async-errors';
import *  as validate from "../routes/validation/search";
import DB from "../../db/db";
import {Handler} from "../public";
import {FindJobListingsByQuery, MatchmadeSearch} from "../../search/search";

export function SearchListings(db: DB): Handler {
    return async (req: Request, res: Response, next: NextFunction) => {
        const term = req.body.term.toString().toLowerCase();
        await validate.isQuery(db,req.body);
        if (req.body.searcherID) {
            const searcherID = req.body.searcherID;
            const results = await MatchmadeSearch(db, term, searcherID);
            res.status(200).json({ results });
            return;
        }
        else {
            const results = await FindJobListingsByQuery(db, term);
            res.status(200).json({ results });
            return;
        }
    };
}
