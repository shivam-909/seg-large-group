import 'express-async-errors';
import DB from "../../db/db";
import { ErrorNotifNotFound, getErrorMessage, Handler } from "../public";
import { NextFunction, Request, Response } from "express";
import * as notificationsdb from "../../db/notifications";
import { randomUUID } from "crypto";
import Notification from "../../models/notification";
import {GetUser} from "./users";
import * as usersdb from "../../db/users";


export function AddNotification(db: DB): Handler {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { content, application, userID } = req.body;
    const newID = randomUUID();
    const created = new Date();
    const newNotification = new Notification(newID, content, application, created, userID);
    await notificationsdb.CreateNotification(db, newNotification);
  }
}

export function GetNotification(db: DB): Handler {
  return async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const notification = await notificationsdb.RetrieveNotification(db, id);
    if (!notification) {
      next(ErrorNotifNotFound);
      return;
    }
  };
}

export function getUserNotificationsRoute(db: DB): Handler {
  return async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    try {
      const user = await usersdb.RetrieveFullUserByID(db, id);
      if (user) {
        const notifications = db.NotificationCollection();
        const snapshot = await notifications.where('userID', '==', id).get();
        if (snapshot.empty) {
          res.status(200).json({
            message: `No notifications for user ${id}`,
          });
        }
        const notificationsArray: Notification[] = [];
        snapshot.forEach(doc => {
          notificationsArray.push(doc.data());
        });
        res.status(200).json(notificationsArray);
      } else {
        res.status(404).json({
          message: `User ${id} not found`,
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

    const notification = await notificationsdb.RetrieveNotification(db, id);
    if (!notification) {
      next(ErrorNotifNotFound)
      return;
    }

    const updatedNotification = { ...notification, ...notificationData };
    await notificationsdb.UpdateNotification(db, updatedNotification);
  }
}

export function DeleteNotification(db: DB): Handler {
  return async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    await notificationsdb.DeleteNotification(db, id);
  };
}
