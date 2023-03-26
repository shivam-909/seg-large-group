import 'express-async-errors';
import { NextFunction, Request, Response } from "express";
import DB from "../../db/db";
import JobListing from "../../models/job";
import * as jobsdb from "../../db/jobs";
import {ErrorJobListingNotFound, ErrorNoMatchingListings, Handler} from "../public";
import { randomUUID } from "crypto";
import * as validate from "../routes/validation/jobs";



export function AddListing(db: DB): Handler {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { title, compensation, description, location, type, schedule, companyID, industry, coverLetterRequired, urgent, qualifications, benefits, requirements, screeningQuestions } = req.body;
    const newID = randomUUID();
    const newJobListing = new JobListing(newID, title, compensation, description, location, type, schedule, companyID, industry, coverLetterRequired, urgent, qualifications, benefits, requirements, screeningQuestions);
    try {
      await validate.AddListing(db, req.body);
    } catch (err) {
      next((err as Error).message);
      return;
    }
    await jobsdb.CreateJobListing(db, newJobListing);
    res.sendStatus(200);
  }
}

export function GetListing(db: DB): Handler {
  return async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try {
      await validate.ListingExists(db, id);
    } catch (err) {
      next((err as Error).message);
      return;
    }

    const jobListing = await jobsdb.RetrieveJobListing(db, id);
    res.status(200).json(jobListing);
  };
}

export function UpdateListing(db: DB): Handler {
  return async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const listingData = req.body;
    try {
      await validate.UpdateListing(db, id,req.body);
    } catch (err) {
      next((err as Error).message);
      return;
    }
    const listing = await jobsdb.RetrieveJobListing(db, id);
    const updatedJobListing = { ...listing, ...listingData };


    await jobsdb.UpdateJobListing(db, updatedJobListing);
    res.status(200).json(updatedJobListing);
  }
}

export function DeleteListing(db: DB): Handler {
  return async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try {
      await validate.ListingExists(db, id);
    } catch (err) {
      next((err as Error).message);
      return;
    }
    await jobsdb.DeleteJobListing(db, id);
    res.sendStatus(200);
  };
}


export function RetrieveJobListingsByFilter(db: DB): Handler {
  return async (req: Request, res: Response, next: NextFunction) => {
    const filters = req.body;
    try {
      await validate.RetrieveListingByFilter(db, filters);
    } catch (err) {
      next((err as Error).message);
      return;
    }

    const jobListings = await jobsdb.RetrieveJobListingsByFilter(db, filters);

    if (!jobListings) {
      next(ErrorNoMatchingListings);
      return;
    }

    res.status(200).json(jobListings);
  }
}