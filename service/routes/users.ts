import { NextFunction, Request, Response } from "express";
import DB from "../../db/db";
import * as usersdb from "../../db/users";
import 'express-async-errors';
import { ErrorUserNotFound, getErrorMessage, Handler } from "../public";

export function GetUser(db: DB): Handler {
    return async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;

        const user = await usersdb.RetrieveFullUserByID(db, id);
        if (!user) {
            next(ErrorUserNotFound);
            return
        }

        res.status(200).json(user);
    };
}

export function UpdateUser(db: DB): Handler {
    return async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        const userData = req.body;

        const user = await usersdb.RetrieveFullUserByID(db, id);
        if (!user) {
            next(ErrorUserNotFound);
            return
        }

        const updatedUser = { ...user, ...userData };
        await usersdb.UpdateUser(db, updatedUser);

    }
}

export function DeleteUser(db: DB): Handler {
    return async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        await usersdb.DeleteUser(db, id);
    };
}




