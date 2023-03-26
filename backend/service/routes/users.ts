import { NextFunction, Request, Response } from "express";
import DB from "../../db/db";
import * as usersdb from "../../db/users";
import 'express-async-errors';
import {getErrorMessage, Handler} from "../public";
import * as errors from "../public";



export function GetUser(db: DB): Handler {
    return async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;

        const user = await usersdb.RetrieveFullUserByID(db, id);
        if (!user) {
            next(errors.ErrorUserNotFound);
            return;
        }
        res.status(200).json(user);
    };
}

export function UpdateUser(db: DB): Handler {
    return async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        const updatedVals = req.body;

        await usersdb.UpdateUser(db, id, updatedVals);
        res.sendStatus(200);
    }
}

export function DeleteUser(db: DB): Handler {
    return async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        await usersdb.DeleteUser(db, id);
        res.sendStatus(200);
    };
}

export function GetUserByTypeID(db: DB): Handler {
    return async (req: Request, res: Response, next: NextFunction) => {

        const { companyID, searcherID } = req.body;

        if (!companyID && !searcherID) {
            next(errors.ErrorNoCompanyOrSearcherID)
        }

        let user;

        if (companyID) {
            user = await usersdb.RetrieveUserByCompanyID(db, companyID);
        } else {
            user = await usersdb.RetrieveUserBySearcherID(db, searcherID);
        }

        if (user) {
            return res.status(200).json(user);
        } else {
            next(errors.ErrorUserNotFound)
            return;
        }
    };
}






