import { NextFunction, Request, Response } from "express";
import DB from "../../db/db";
import * as usersdb from "../../db/users";
import 'express-async-errors';
import { Handler } from "../public";
import * as errors from "../public";
import * as validate from "./validation/users";

export function GetUser(db: DB): Handler {
    return async (req: Request, res: Response, next: NextFunction) => {
        const uid = req.params.uid;
        const cid = req.headers["auth_username"] as string;

        let id;
        if (uid && cid) {
            id = uid;
        } else if (uid && !cid) {
            id = uid;
        } else if (!uid && cid) {
            id = cid;
        } else {
            throw new Error(errors.ErrorUserNotFound);
        }

        await validate.UserExists(db, id);
        const user = await usersdb.RetrieveFullUserByID(db, id);
        res.status(200).json(user);
    };
}

export function UpdateUser(db: DB): Handler {
    return async (req: Request, res: Response, next: NextFunction) => {

        const id = req.headers["auth_username"] as string;
        if (!id) {
            throw new Error(errors.ErrorUserNotFound);
        }
        const updatedVals = req.body;
        // await validate.UpdateUser(db, id, updatedVals);
        await usersdb.UpdateUser(db, id, updatedVals);
        res.sendStatus(200);

    }
}

export function DeleteUser(db: DB): Handler {

    return async (req: Request, res: Response, next: NextFunction) => {

        const id = req.headers["auth_username"] as string;
        if (!id) {
            throw new Error(errors.ErrorUserNotFound);
        }
        await validate.UserExists(db, id);
        await usersdb.DeleteUser(db, id);

    };
}

export function GetUserByTypeID(db: DB): Handler {
    return async (req: Request, res: Response, next: NextFunction) => {

        await validate.GetUserByType(db, req.body);
        const { companyID, searcherID } = req.body;
        let user;
        if (companyID) {
            user = await usersdb.RetrieveUserByCompanyID(db, companyID);
        }
        else {
            user = await usersdb.RetrieveUserBySearcherID(db, searcherID);
        }
        return res.status(200).json(user);

    };
}






