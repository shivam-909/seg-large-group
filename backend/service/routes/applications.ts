import 'express-async-errors';

import { NextFunction, Request, Response } from "express";
import DB from "../../db/db";
import Application from "../../models/application";
import * as applicationdb from "../../db/applications";
import { ErrorApplicationNotFound, getErrorMessage, Handler } from "../public";
import { randomUUID } from "crypto";
import * as validate from "../routes/validation/applications";

export function AddApplication(db: DB): Handler {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await validate.AddApplication(db, req.body);
    } catch (err) {
      next(err);
      return;
    }
    const { status, searcher, jobListing, cv, coverLetter, QnAs } = req.body;
    const newID = randomUUID();
    const newApplication = new Application(newID, status, searcher, jobListing, cv, coverLetter, QnAs);

    await applicationdb.CreateApplication(db, newApplication);
  }
}


export function GetApplication(db: DB): Handler {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      await validate.ApplicationExists(db, id);
    } catch (err) {
      return next(err);
    }
    const application = await applicationdb.RetrieveApplication(db, id);
    res.status(200).json(application);
  };
}

export function RetrieveApplicationByFilter(db: DB): Handler {
  return async (req: Request, res: Response, next: NextFunction) => {

    try {
      await validate.RetrieveApplicationByFilter(db, req.body);
    } catch (err) {
      next(err);
      return;
    }

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

    try {
      await validate.UpdateApplication(db, req.params.id, req.body);
    } catch (err) {
      next(err);
      return;
    }

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

    try {
      await validate.ApplicationExists(db, id);
    } catch (err) {
      return next(err);
    }

    await applicationdb.DeleteApplication(db, id);
    res.sendStatus(200);
  }
};

