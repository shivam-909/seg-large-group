import { NextFunction, Request, Response } from "express";
import { ErrorCompanyNotFound, Handler } from "../public";
import DB from "../../db/db";
import * as companiesdb from "../../db/companies";

export function GetCompany(db: DB): Handler {
    return async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        const user = await companiesdb.RetrieveCompanyByID(db, id);
        if (!user) {
            next(ErrorCompanyNotFound);
            return
        }
        res.status(200).json(user);
    };
}

