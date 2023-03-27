import 'express-async-errors';

import { NextFunction, Request, Response } from "express";
import DB from "../../db/db";
import Application from "../../models/application";
import * as applicationdb from "../../db/applications";
import { Handler } from "../public";
import { randomUUID } from "crypto";
import * as validate from "../routes/validation/applications";
import 'express-async-errors';


export function AddApplication(db: DB): Handler {
  return async (req: Request, res: Response, next: NextFunction) => {
    await validate.AddApplication(db, req.body);
    const { status, searcher, jobListing, cv, coverLetter, QnAs } = req.body;
    const newID = randomUUID();
    const newApplication = new Application(newID, status, searcher, jobListing, cv, JSON.parse(QnAs), coverLetter);
    await applicationdb.CreateApplication(db, newApplication);
  }
}


export function GetApplication(db: DB): Handler {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    await validate.ApplicationExists(db, id);
    const application = await applicationdb.RetrieveApplication(db, id);
    res.status(200).json(application);

  };
}

export function RetrieveApplicationByFilter(db: DB): Handler {
  return async (req: Request, res: Response, next: NextFunction) => {

    await validate.RetrieveApplicationByFilter(db, req.body);

    const filters = {
      id: req.body.id || '',
      status: req.body.status || '',
      searcher: req.body.searcher || '',
      jobListing: req.body.jobListing || '',
    };

    const applications = await applicationdb.GetApplicationsByFilter(db, filters);
    res.status(200).json({
      applications,
    });
  };
}

export function UpdateApplication(db: DB): Handler {
  return async (req: Request, res: Response, next: NextFunction) => {

    await validate.UpdateApplication(db, req.params.id, req.body);
    const id = req.params.id;
    const applicationData = req.body;

    const application = await applicationdb.RetrieveApplication(db, id);

    const updatedApplication = { ...application, ...applicationData };
    await applicationdb.UpdateApplication(db, updatedApplication);
    res.sendStatus(200);
  }
}


export function DeleteApplication(db: DB): Handler {
  return async (req: Request, res: Response, next: NextFunction) => {

    const id = req.params.id;
    await validate.ApplicationExists(db, id);
    await applicationdb.DeleteApplication(db, id);
    res.sendStatus(200);

  }
};

