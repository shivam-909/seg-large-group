import { NextFunction, Request, Response } from "express";
import 'express-async-errors';
import *  as validate from "../routes/validation/search";
import DB from "../../db/db";
import {getErrorMessage, Handler} from "../public";
import * as errors from "../public";
import { findJobListingsByQuery } from "../../search/search";
import { isQuery } from "./validation/search";

export function SearchListings(db: DB): Handler {
    return async (req: Request, res: Response, next: NextFunction) => {

        await validate.isQuery(db,req.body);
        const results = await findJobListingsByQuery(db, req.body);
        res.status(200).json({ results });

    };
}