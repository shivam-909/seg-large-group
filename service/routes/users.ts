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


export function getCompanyRoute(db: DB): Handler {
    return async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;

        try {
            const user = await getCompanyfromCompanyID(db, id);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({
                    message: `Company ${id} not found`
                });
            }
        } catch (err) {
            next({
                message: getErrorMessage(err),
            });
        }
    };
}

export function getSearcherRoute(db: DB): Handler {
    return async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;

        try {
            const user = await getSearcherfromSearcherID(db, id);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({
                    message: `Searcher ${id} not found`
                });
            }
        } catch (err) {
            next({
                message: getErrorMessage(err),
            });
        }
    };
}


