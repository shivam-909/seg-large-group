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
import { RetrieveApplication } from "../../db/applications";
import { RetrieveJobListing } from "../../db/jobs";
import { RetrieveCompanyByID } from "../../db/companies";
import { RetrieveFullUserByID } from "../../db/users";
import *  as validate from "../routes/validation/notifications";
import {GetUser} from "./users";
import notification from "../../models/notification";

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

export function GetNotification(db: DB): Handler {
  return async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const notification = await notificationsdb.RetrieveNotification(db, id);

    if (!notification) {
      next(errors.ErrorNotifNotFound);
      return;
    }

    const user = await RetrieveFullUserByID(db, notification.userID);
    const application = await RetrieveApplication(db, notification.applicationID);

    let jobListing = null;
    let title = null;
    let company = null;
    let companyName = null;
    let searcherID = null;
    let firstName = null;
    let lastName = null;
    let userID = null;

    if(user) {
      if (user?.searcher) {

        if (application) jobListing = await RetrieveJobListing(db, application.jobListing);
        if (jobListing) {
          title = jobListing.title;
          company = await RetrieveCompanyByID(db, jobListing.companyID);
        }
        if (company) companyName = company.companyName;
        searcherID = user.searcherID;

      }
      if (user?.company) {

         if(application){
           const searcher = await RetrieveFullUserByID(db, application.searcher);
           firstName = searcher?.searcher?.firstName;
           lastName = searcher?.searcher?.lastName;
           userID = searcher?.userID;
         }
      }
    }

    const newNotification = {
      ...notification,
      companyName,
      title,
      searcherID,
      firstName,
      lastName,
      userID,
    }

    res.status(200).json(newNotification);
  };
}

export function GetAllUserNotifs(db: DB): Handler {
  return async (req: Request, res: Response, next: NextFunction) => {

    const id = req.params.id;
    const notifications = await notificationsdb.GetAllUserNotifs(db, id);
    let finalNotifs: any[] = [];


    for(let i=0; i< notifications.length; i++){

      const notification = notifications[i];
      const user = await RetrieveFullUserByID(db, notification.userID);
      const application = await RetrieveApplication(db, notification.applicationID);


      let jobListing = null;
      let title = null;
      let company = null;
      let companyName = null;
      let searcherID = null;
      let firstName = null;
      let lastName = null;
      let userID = null;

      if(user) {
        if (user?.searcher) {

          if (application) jobListing = await RetrieveJobListing(db, application.jobListing);
          if (jobListing) {
            title = jobListing.title;
            company = await RetrieveCompanyByID(db, jobListing.companyID);
          }
          if (company) companyName = company.companyName;
          searcherID = user.searcherID;

        }
        if (user?.company) {

          if(application){
            const searcher = await RetrieveFullUserByID(db, application.searcher);
            firstName = searcher?.searcher?.firstName;
            lastName = searcher?.searcher?.lastName;
            userID = searcher?.userID;
          }
        }
      }

      const newNotification = {
        ...notification,
        companyName,
        title,
        searcherID,
        firstName,
        lastName,
        userID,
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

