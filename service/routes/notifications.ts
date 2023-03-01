import DB from "../../db/db";
import {getErrorMessage, Handler} from "../public";
import {NextFunction, Request, Response} from "express";
import {deleteNotification, retrieveNotification, updateNotification} from "../../db/notifications";


export function getNotificationRoute(db: DB): Handler {
    return async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;

        try {
            const notification = await retrieveNotification(db, id);
            if (notification) {
                res.status(200).json(notification);
            } else {
                res.status(404).json({
                    message: `Notification ${id} not found`,
                });
            }
        } catch (err) {
            next({
                message: getErrorMessage(err),
            });
        }
    };
}

export function updateNotificationRoute(db: DB): Handler {
    return async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        const notificationData = req.body;

        try {
            const notification = await retrieveNotification(db, id);
            if (!notification) {
                return res.status(404).json({
                    msg: `Notification ${id} not found`
                });
            }

            const updatedNotification = { ...notification, ...notificationData };
            await updateNotification(db, updatedNotification);

            res.status(200).json({
                msg: "Notification updated"
            });
        } catch (err) {
            next({
                message: getErrorMessage(err),
            });
        }
    }
}

export function deleteNotificationRoute(db: DB): Handler {
    return async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;

        try {
            await deleteNotification(db, id);
            res.status(200).json({
                msg: `Notification ${id} has been deleted`,
            });
        } catch (err) {
            next({
                message: getErrorMessage(err),
            });
        }

    };
}