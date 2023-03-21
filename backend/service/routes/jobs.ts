import 'express-async-errors';
import { NextFunction, Request, Response } from "express";
import DB from "../../db/db";
import JobListing from "../../models/job";
import * as jobsdb from "../../db/jobs";
import {ErrorJobListingNotFound, ErrorNoMatchingListings, Handler} from "../public";
import { randomUUID } from "crypto";

export function AddListing(db: DB): Handler {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { title, compensation, description, location, schedule, companyID, industry, coverLetterRequired, qualifications, benefits, requirements, screeningQuestions } = req.body;
    const newID = randomUUID();
    const newJobListing = new JobListing(newID, title, compensation, description, location, schedule, companyID, industry, coverLetterRequired, qualifications, benefits, requirements, screeningQuestions);
    await jobsdb.CreateJobListing(db, newJobListing);
  }
}

export function GetListing(db: DB): Handler {
  return async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const jobListing = await jobsdb.RetrieveJobListing(db, id);
    if (!jobListing) {
      next(ErrorJobListingNotFound);
      return;
    }

    res.status(200).json(jobListing);
  };
}

export function UpdateListing(db: DB): Handler {
  return async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const listingData = req.body;

    const listing = await jobsdb.RetrieveJobListing(db, id);
    if (!listing) {
      next(ErrorJobListingNotFound);
      return;
    }

    const updatedJobListing = { ...listing, ...listingData };
    await jobsdb.UpdateJobListing(db, updatedJobListing);

    res.status(200).json(updatedJobListing);
  }
}

export function DeleteListing(db: DB): Handler {
  return async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    await jobsdb.DeleteJobListing(db, id);
    res.sendStatus(200);
  };
}


export function RetrieveJobListingsByFilter(db: DB): Handler {
  return async (req: Request, res: Response, next: NextFunction) => {
    const filters = req.body;

    const jobListings = await jobsdb.RetrieveJobListingsByFilter(db, filters);

    if (!jobListings) {
      next(ErrorNoMatchingListings);
      return;
    }

    res.status(200).json(jobListings);
  }
}