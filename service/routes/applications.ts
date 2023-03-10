import 'express-async-errors';

import { NextFunction, Request, Response } from "express";
import DB from "../../db/db";
import Application from "../../models/application";
import * as applicationdb from "../../db/applications";
import { ErrorApplicationNotFound, getErrorMessage, Handler } from "../public";
import { SeedApplicationListings } from "../../seeder/seed";
import { randomUUID } from "crypto";

export function AddApplication(db: DB): Handler {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { status, searcher, jobListing } = req.body;
    const newID = randomUUID();
    const newApplication = new Application(newID, status, searcher, jobListing);

    await applicationdb.CreateApplication(db, newApplication);
    res.status(200).json({
      msg: "application created"
    });
    return;

  }
}

export function GetApplication(db: DB): Handler {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const application = await applicationdb.RetrieveApplication(db, id);
    if (application) {
      res.status(200).json(application);
    } else {
      res.status(404).json({
        message: 'application not found'
      });
    }

  };
}

export function RetrieveApplicationByFilter(db: DB): Handler {
  return async (req: Request, res: Response, next: NextFunction) => {
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

export function SeedApplications(db: DB): Handler {
  return async (req: Request, res: Response, next: NextFunction) => {
    await SeedApplicationListings(db);
    res.status(200).json({
      message: 'Applications seeded successfully'
    });

  };
}

export function UpdateApplication(db: DB): Handler {
  return async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const applicationData = req.body;

    const application = await applicationdb.RetrieveApplication(db, id);
    if (!application) {
      next(ErrorApplicationNotFound);
    }

    const updatedApplication = { ...application, ...applicationData };
    await applicationdb.UpdateApplication(db, updatedApplication);

    res.status(200).send();
  }
}

export function DeleteApplication(db: DB): Handler {
  return async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    await applicationdb.DeleteApplication(db, id);
  }
};

