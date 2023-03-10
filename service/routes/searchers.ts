import { ErrorSearcherNotFound, Handler } from "../public";
import { NextFunction, Request, Response } from "express";
import DB from "../../db/db";
import * as searchersdb from "../../db/searchers";

export function GetSearcher(db: DB): Handler {
    return async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;

        const user = await searchersdb.RetrieveSearcherByID(db, id);
        if (!user) {
            next(ErrorSearcherNotFound);
        }
        res.status(200).json(user);
    };
}