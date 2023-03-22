import { NextFunction, Request, Response } from "express";
import DB from "../../db/db";
import { Handler } from "../public";
import {findJobListingsByQuery} from "../../search/search";
import {isQuery} from "./validation/search";

export function searchListingsRoute(db: DB): Handler {
    return async (req: Request, res: Response, next: NextFunction) => {

        try {
            await isQuery(db, req.body);
        } catch (err) {
            next((err as Error).message);
            return;
        }

        const results = await findJobListingsByQuery(db, req.body.term.toString().toLowerCase());
        res.status(200).json({ results });

    };
}