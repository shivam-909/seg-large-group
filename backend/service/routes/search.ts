import { NextFunction, Request, Response } from "express";
import 'express-async-errors';
import *  as validate from "../routes/validation/search";
import DB from "../../db/db";
import { Handler } from "../public";
import { FindJobListingsByQuery, MatchmadeSearch } from "../../search/search";
import { RetrieveFullUserByID } from "../../db/users";


export function SearchListings(db: DB): Handler {
    return async (req: Request, res: Response, next: NextFunction) => {
        const term = req.body.term.toString().toLowerCase();
        await validate.isQuery(db, req.body);

        if (req.headers.auth_username) {
            const userID = req.headers.auth_username as string;
            const user = await RetrieveFullUserByID(db, userID);

            const searcherID = user?.searcherID;
            if (searcherID) {
                const results = await MatchmadeSearch(db, term, searcherID);
                return res.status(200).json({ results });
            }
        }
        const results = await FindJobListingsByQuery(db, term);
        return res.status(200).json({ results });
    };
}



