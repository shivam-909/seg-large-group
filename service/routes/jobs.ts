import 'express-async-errors';
import { NextFunction, Request, Response } from "express";
import DB from "../../db/db";
import JobListing from "../../models/job";
import * as jobsdb from "../../db/jobs";
import { ErrorFailedToCreateListing, ErrorJobListingNotFound, ErrorNoMatchingListings, Handler } from "../public";
import { randomUUID } from "crypto";
import { ParseScreeningQuestions, StringFromCommaSeparatedList } from './routes';
import * as validate from "../routes/validation/jobs";




export function AddListing(db: DB): Handler {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { title, compensation, description, location, type, schedule, industry, cover_letter_required, urgent, qualifications, benefits, requirements, screening_questions } = req.body;
    const newID = randomUUID();
    await validate.AddListing(db, req.body);
    console.log("RECEIVED CREATE JOB LISTING REQUEST")

    // Get auth_username from headers.
    const companyID = req.headers.auth_username as string;
    const parsedCompensation = StringFromCommaSeparatedList(compensation);
    const parsedQualifications = StringFromCommaSeparatedList(qualifications);
    const parsedBenefits = StringFromCommaSeparatedList(benefits);
    const parsedType = StringFromCommaSeparatedList(type);
    const parsedRequirements = StringFromCommaSeparatedList(requirements);
    const parsedSchedule = StringFromCommaSeparatedList(schedule);
    const parsedScreeningQuestions = ParseScreeningQuestions(screening_questions);
    const datePosted = new Date();

    const newJobListing = new JobListing(
      newID,
      title,
      parsedCompensation,
      description,
      location,
      parsedType,
      parsedSchedule,
      companyID,
      industry,
      cover_letter_required,
      urgent,
      parsedQualifications,
      datePosted,
      parsedBenefits,
      parsedRequirements,
      parsedScreeningQuestions);

    const listing = await jobsdb.CreateJobListing(db, newJobListing);

    if (listing === null) {
      next(ErrorFailedToCreateListing);
      return;
    }

    console.log("CREATED LISTING")

    res.json({
      id: listing.id,
    }).send();
  }
}

export function GetListing(db: DB): Handler {
  return async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    await validate.ListingExists(db, id);
    const jobListing = await jobsdb.RetrieveJobListing(db, id);
    res.status(200).json(jobListing);
  };
}

export function UpdateListing(db: DB): Handler {
  return async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const listingData = req.body;
    await validate.UpdateListing(db, id ,req.body);
    const listing = await jobsdb.RetrieveJobListing(db, id);
    const updatedJobListing = { ...listing, ...listingData };


    await jobsdb.UpdateJobListing(db, updatedJobListing);
    res.status(200).json(updatedJobListing);

    return;
  }
}

export function DeleteListing(db: DB): Handler {
  return async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    await validate.ListingExists(db, id);
    await jobsdb.DeleteJobListing(db, id);
    res.sendStatus(200);
  };
}


export function RetrieveJobListingsByFilter(db: DB): Handler {
  return async (req: Request, res: Response, next: NextFunction) => {
    const filters = req.body;
    await validate.RetrieveListingByFilter(db, filters);
    const jobListings = await jobsdb.RetrieveJobListingsByFilter(db, filters);
    res.status(200).json(jobListings);
  }
}