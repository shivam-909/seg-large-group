import {Handler } from "../public";
import { NextFunction, Request, Response } from "express";
import DB from "../../db/db";
import * as searchersdb from "../../db/searchers";
import {ValidateSearcherId} from "./validation/checks";

export function GetSearcher(db: DB): Handler {
    return async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        try {
            await ValidateSearcherId(db, id);
        } catch (err) {
            next((err as Error).message);
            return;
        }
        const user = await searchersdb.RetrieveSearcherByID(db, id);
        res.status(200).json(user);
    };
}