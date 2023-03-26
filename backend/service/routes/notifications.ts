import 'express-async-errors';
import DB from "../../db/db";
import {
  getErrorMessage,
  Handler
} from "../public";
import * as errors from "../public";
import { NextFunction, Request, Response } from "express";
import * as notificationsdb from "../../db/notifications";
import { randomUUID } from "crypto";
import Notification from "../../models/notification";
import {RetrieveApplication} from "../../db/applications";
import {RetrieveJobListing} from "../../db/jobs";
import {RetrieveCompanyByID} from "../../db/companies";
import {RetrieveFullUserByID} from "../../db/users";
import * as validate from "./validation/notifications";



export function AddNotification(db: DB): Handler {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { content, application, userID } = req.body;
    const newID = randomUUID();
    const created = new Date();
    const newNotification = new Notification(newID, content, application, created, userID);
    try {
      await validate.AddNotification(db, { content, application, created, userID});
    } catch (err) {
      next((err as Error).message);
      return;
    }
    await notificationsdb.CreateNotification(db, newNotification);
    res.sendStatus(200)
  }
}

export function GetNotification(db: DB): Handler {
  return async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const notification = await notificationsdb.RetrieveNotification(db, id);

    if (!notification) {
      next(errors.ErrorNotifNotFound);
      return;
    }

    const application = await RetrieveApplication(db, notification.applicationID);
    let jobListing = null;
    if(application) jobListing = await RetrieveJobListing(db, application.jobListing);
    let title = null;
    let company = null;
    if(jobListing){
      title = jobListing.title;
      company = await RetrieveCompanyByID(db,jobListing.companyID);
    }
    let companyName = null;
    if(company) companyName = company.companyName;

    const user = await RetrieveFullUserByID(db, notification.userID);
    let searcherID = null;
    if(user) searcherID = user.searcherID;


    const newNotification = {
      ...notification,
      companyName,
      title,
      searcherID,
    }

    res.status(200).json(newNotification);

  };
}


export function DeleteNotification(db: DB): Handler {
  return async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    try {
      await validate.NotificationExists(db, id);
    } catch (err) {
      next((err as Error).message);
      return;
    }

    await notificationsdb.DeleteNotification(db, id);
    res.sendStatus(200);
  };
}
