import 'express-async-errors';
import DB from "../../db/db";
import { getErrorMessage, Handler } from "../public";
import { NextFunction, Request, Response } from "express";
import * as notificationsdb from "../../db/notifications";
import { randomUUID } from "crypto";
import Notification from "../../models/notification";


export function AddNotification(db: DB): Handler {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { content, application, userID } = req.body;
    const newID = randomUUID();
    const created = new Date();
    const newNotification = new Notification(newID, content, application, created, userID);

    try {
      let notification = await notificationsdb.CreateNotification(db, newNotification);
      res.status(200).json({
        msg: `Notification ${notification.id} created`,
      });
    } catch (err) {
      next({
        message: getErrorMessage(err),
      });
    }
  }
}

export function GetNotification(db: DB): Handler {
  return async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    try {
      const notification = await notificationsdb.RetrieveNotification(db, id);
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

export function UpdateNotification(db: DB): Handler {
  return async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const notificationData = req.body;

    try {
      const notification = await notificationsdb.RetrieveNotification(db, id);
      if (!notification) {
        return res.status(404).json({
          msg: `Notification ${id} not found`
        });
      }

      const updatedNotification = { ...notification, ...notificationData };
      await notificationsdb.UpdateNotification(db, updatedNotification);

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

export function DeleteNotification(db: DB): Handler {
  return async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    try {
      await notificationsdb.DeleteNotification(db, id);
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
