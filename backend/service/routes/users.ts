import { NextFunction, Request, Response } from "express";
import DB from "../../db/db";
import {deleteUser, retrieveUserById, updateUser} from "../../db/users";
import { Error, getErrorMessage, Handler } from "../public";

export function getUserRoute(db: DB): Handler {
    return async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;

        try {
            const user = await retrieveUserById(db, id);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({
                    message: 'User not found'
                });
            }
        } catch (err) {
            next({
                message: getErrorMessage(err),
            });
        }
    };
}

export function updateUserRoute(db: DB): Handler {
    return async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const userData = req.body;

        try {
            const user = await retrieveUserById(db, id);
            if (!user) {
                return res.status(404).json({
                    msg: "User not found"
                });
            }

            const updatedUser = { ...user, ...userData };
            await updateUser(db, updatedUser);

            res.status(200).json({
                msg: "User updated"
            });
        } catch (err) {
            next({
                message: getErrorMessage(err),
            });
        }
    }
}

export function deleteUserRoute(db: DB): Handler {
    return async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        const user = { userID: id };

        try {
            await deleteUser(db, user);
            res.status(200).json({
                msg: "User has been deleted",
            });
        } catch (err) {
            next({
                message: getErrorMessage(err),
            });
        }
    };
}




