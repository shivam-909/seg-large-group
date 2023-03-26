import { NextFunction, Request, Response } from "express";
import DB from "../../db/db";
import * as usersdb from "../../db/users";
import 'express-async-errors';
import * as errors from "../public";
import {ErrorMissingProperty, ErrorUserNotFound, getErrorMessage, Handler} from "../public";
import * as validate from "./validation/users";

export function GetUser(db: DB): Handler {
    return async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;

        try {
            await validate.UserExists(db, id);
        } catch (err) {
            next((err as Error).message);
            return;
        }
        const user = await usersdb.RetrieveFullUserByID(db, id);
        res.status(200).json(user);
    };
}

export function UpdateUser(db: DB): Handler {
    return async (req: Request, res: Response, next: NextFunction) => {

        const id = req.params.id;
        const updatedVals = req.body;

        // try {
        //     await validate.UpdateUser(db, req.params.id, req.body);
        // } catch (err) {
        //     next((err as Error).message);
        //     return;
        // }

        await usersdb.UpdateUser(db, id, updatedVals);
        res.sendStatus(200);

    }
}

export function DeleteUser(db: DB): Handler {
    return async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        try {
            await validate.UserExists(db, id);
        } catch (err) {
            next((err as Error).message);
            return;
        }
        await usersdb.DeleteUser(db, id);
        res.sendStatus(200);
    };
}

export function GetUserByTypeID(db: DB): Handler {
    return async (req: Request, res: Response, next: NextFunction) => {

        try {
            await validate.GetUserByType(db, req.body);
        } catch (err) {
            next((err as Error).message);
            return;
        }

        const { companyID, searcherID } = req.body;
        let user;
        if (companyID) {
            user = await usersdb.RetrieveUserByCompanyID(db, companyID);
        } else {
            user = await usersdb.RetrieveUserBySearcherID(db, searcherID);
        }
        return res.status(200).json(user);
    };
}






