import { NextFunction, Request, Response } from "express";
import DB from "../../db/db";
import { getErrorMessage, Handler } from "../public";
import {findJobListingsByQuery} from "../../search/search";

export function SearchListings(db: DB): Handler {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const query = req.body.term.toString().toLowerCase();
            if (!query) {
                return res.status(400).json({ message: 'Query string is required' });
            } else {
                const results = await findJobListingsByQuery(db, query);
                res.status(200).json({ results });
            }
        } catch (err) {
            next({
                message: getErrorMessage(err),
            });
        }
    };
}