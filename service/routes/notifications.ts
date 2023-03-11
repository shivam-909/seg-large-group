import 'express-async-errors';
import DB from "../../db/db";
import { ErrorNotifNotFound, getErrorMessage, Handler } from "../public";
import { NextFunction, Request, Response } from "express";
import * as notificationsdb from "../../db/notifications";
import { randomUUID } from "crypto";
import Notification from "../../models/notification";
import {RetrieveApplication} from "../../db/applications";
import {RetrieveJobListing} from "../../db/jobs";
import {RetrieveCompanyByID} from "../../db/companies";
import Application from "../../models/application";
import job from "../../models/job";


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


    const newNotification = {
      ...notification,
      companyName,
      title,
    }

    res.status(200).json(newNotification);

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
