import { NextFunction, Request, Response } from "express";
import DB from "../../db/db";
import { retrieveCompanyById, deleteCompanyByID } from "../../db/users";
import { Error, getErrorMessage, Handler } from "../public";

export function GetCompany(db: DB): Handler {
    return async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;

        try {
            const company = await retrieveCompanyById(db, id);
            if (company) {
                res.status(200).json(company);
            } else {
                res.status(404).json({
                    message: 'Company not found'
                });
            }
        } catch (err) {
            next({
                message: getErrorMessage(err),
            });
        }
    };
}


export function DeleteCompany(db: DB): Handler {
    return async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;

        try {
            await deleteCompanyByID(db, id);
            res.status(200).json({
                msg: "Company has been deleted",
            });
        } catch (err) {
            next({
                message: getErrorMessage(err),
            });
        }
    };
}



