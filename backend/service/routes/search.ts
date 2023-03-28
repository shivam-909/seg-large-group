import { NextFunction, Request, Response } from "express";
import 'express-async-errors';
import *  as validate from "../routes/validation/search";
import DB from "../../db/db";
import {getErrorMessage, Handler} from "../public";
import { findJobListingsByQuery } from "../../search/search";

export function SearchListings(db: DB): Handler {
    return async (req: Request, res: Response, next: NextFunction) => {
        const query = req.body.term.toString().toLowerCase();
        await validate.isQuery(db, req.body);
        const results = await findJobListingsByQuery(db, query);
        res.status(200).json({results});

    };
}