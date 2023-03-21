import { NextFunction, Request, Response } from "express";
import DB from "../../db/db";
import {getErrorMessage, Handler} from "../public";
import * as errors from "../public";
import {findJobListingsByQuery} from "../../search/search";

export function searchListingsRoute(db: DB): Handler {
    return async (req: Request, res: Response, next: NextFunction) => {
        const query = req.body.term.toString().toLowerCase();

        if (!query) {
            next(errors.ErrorSearchQueryRequired)
            return;
        } else {
            const results = await findJobListingsByQuery(db, query);
            res.status(200).json({ results });
        }
    };
}