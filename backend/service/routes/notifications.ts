import 'express-async-errors';
import DB from "../../db/db";
import {
  Handler
} from "../public";
import * as errors from "../public";
import { NextFunction, Request, Response } from "express";
import * as notificationsdb from "../../db/notifications";
import { randomUUID } from "crypto";
import Notification from "../../models/notification";
import { RetrieveApplication } from "../../db/applications";
import { RetrieveJobListing } from "../../db/jobs";
import { RetrieveCompanyByID } from "../../db/companies";
import {RetrieveFullUserByID, RetrieveUserBySearcherID} from "../../db/users";
import *  as validate from "../routes/validation/notifications";
import {RetrieveSearcherByID} from "../../db/searchers";

export function AddNotification(db: DB): Handler {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { content, application, userID } = req.body;
    const newID = randomUUID();
    const created = new Date();
    const newNotification = new Notification(newID, content, application, created, userID);
    await validate.AddNotification(db, { content, application, created, userID });
    await notificationsdb.CreateNotification(db, newNotification);
    res.sendStatus(200)
  }
}

export function GetAllUserNotifs(db: DB): Handler {
  return async (req: Request, res: Response, next: NextFunction) => {

    const id = req.headers["auth_username"] as string;
    if (!id) {
      throw new Error(errors.ErrorUserNotFound);
    }
    const notifications = await notificationsdb.GetAllUserNotifs(db, id);
    let finalNotifs: any[] = [];

    for(let i=0; i< notifications.length; i++){

      const notification = notifications[i];
      const user = await RetrieveFullUserByID(db, notification.userID);
      const application = await RetrieveApplication(db, notification.applicationID);

      let jobListing = null;
      let jobListingID = null;
      let title = null;
      let company = null;
      let companyName = null;
      let firstName = null;
      let lastName = null;
      let applyingUserID = null;

      if(!user){
        throw new Error(errors.ErrorUserNotFound);
      }

      if (!application) {
        throw new Error(errors.ErrorApplicationNotFound);
      }

      if (user?.searcher) {
        jobListing = await RetrieveJobListing(db, application.jobListing);
        if (!jobListing) throw new Error(errors.ErrorJobListingNotFound);
        jobListingID = jobListing.id;
        title = jobListing.title;
        company = await RetrieveCompanyByID(db, jobListing.companyID);
        if(!company) throw new Error(errors.ErrorCompanyNotFound);
        companyName = company.companyName;
      }

      if (user?.company) {
        const searcher = await RetrieveSearcherByID(db, application.searcher);
        const searchUser = await RetrieveUserBySearcherID(db, application.searcher)
        jobListing = await RetrieveJobListing(db, application.jobListing);
        if (!jobListing) throw new Error(errors.ErrorJobListingNotFound);
        if(!searcher){
          throw new Error(errors.ErrorSearcherNotFound);
        }
        if(!user){
          throw new Error(errors.ErrorUserNotFound);
        }
        jobListingID = jobListing.id;
        title = jobListing.title;
        firstName = searcher.firstName;
        lastName = searcher.lastName;
        applyingUserID = searchUser?.userID;
      }

      const newNotification = {
        ...notification,
        jobListingID,
        companyName,
        title,
        firstName,
        lastName,
        applyingUserID,
      }
      finalNotifs.push(newNotification);
    }

    res.status(200).json({finalNotifs});
  }

}

  export function DeleteNotification(db: DB): Handler {
    return async (req: Request, res: Response, next: NextFunction) => {
      const id = req.params.id;
      await validate.NotificationExists(db, id);
      await notificationsdb.DeleteNotification(db, id);
      res.sendStatus(200);
    };
  }

