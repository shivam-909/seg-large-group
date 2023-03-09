import 'express-async-errors';

import { NextFunction, Request, Response } from "express";
import DB from "../../db/db";
import Application from "../../models/application";
import * as applicationdb from "../../db/applications";
import { getErrorMessage, Handler } from "../public";
import { seedApplicationListings } from "../../seeder/seed";
import { randomUUID } from "crypto";

export function AddApplication(db: DB): Handler {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { status, searcher, jobListing } = req.body;
    const newID = randomUUID();
    const newApplication = new Application(newID, status, searcher, jobListing);

    try {
      await applicationdb.CreateApplication(db, newApplication);
      res.status(200).json({
        msg: "application created"
      });
      return;
    } catch (err) {
      next({
        message: getErrorMessage(err),
      });
    }
  }
}

export function GetApplication(db: DB): Handler {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
      const application = await applicationdb.RetrieveApplication(db, id);
      if (application) {
        res.status(200).json(application);
      } else {
        res.status(404).json({
          message: 'application not found'
        });
      }
    } catch (err) {
      next({
        message: getErrorMessage(err),
      });
    }
  };
}

export function getApplicationByFilterRoute(db: DB): Handler {
  return async (req: Request, res: Response, next: NextFunction) => {
    const filters = {
      id: req.body.id || '',
      status: req.body.status || '',
      searcher: req.body.searcher || '',
      jobListing: req.body.jobListing || '',
    };

    try {
      const applications = await GetApplicationsByFilter(db, filters);
      res.status(200).json({
        applications,
      });
    } catch (err) {
      next({
        message: getErrorMessage(err),
      });
    }
  };
}

export function SeedApplications(db: DB): Handler {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await seedApplicationListings(db);
      res.status(200).json({
        message: 'Applications seeded successfully'
      });
    } catch (err) {
      next(err);
    }
  };
}

export function UpdateApplication(db: DB): Handler {
  return async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const applicationData = req.body;

    try {
      const application = await applicationdb.RetrieveApplication(db, id);
      if (!application) {
        return res.status(404).json({
          msg: `Application ${id} not found`
        });
      }

      const updatedApplication = { ...application, ...applicationData };
      await applicationdb.UpdateApplication(db, updatedApplication);

      res.status(200).json({
        msg: "Application updated"
      });
    } catch (err) {
      next({
        message: getErrorMessage(err),
      });
    }
  }
}

export function DeleteApplication(db: DB): Handler {
  return async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    try {
      await applicationdb.DeleteApplication(db, id);
      res.status(200).json({
        msg: `Application ${id} has been deleted`,
      });
    } catch (err) {
      next({
        message: getErrorMessage(err),
      });
    }
  };
}
