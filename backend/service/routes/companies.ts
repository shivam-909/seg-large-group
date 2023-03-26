import { NextFunction, Request, Response } from "express";
import {Handler } from "../public";
import DB from "../../db/db";
import * as companiesdb from "../../db/companies";
import {ValidateCompanyId} from "./validation/checks";

export function GetCompany(db: DB): Handler {
    return async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        try {
            await ValidateCompanyId(db, id);
        } catch (err) {
            next((err as Error).message);
            return;
        }
        const user = await companiesdb.RetrieveCompanyByID(db, id);
        res.status(200).json(user);
    };
}

