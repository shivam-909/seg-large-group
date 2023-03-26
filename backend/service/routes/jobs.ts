import 'express-async-errors';
import { NextFunction, Request, Response } from "express";
import DB from "../../db/db";
import JobListing from "../../models/job";
import * as jobsdb from "../../db/jobs";
import { ErrorJobListingNotFound, Handler } from "../public";
import { randomUUID } from "crypto";
import * as validate from "../routes/validation/jobs";
import { ParseScreeningQuestions, StringFromCommaSeparatedList } from './routes';



export function AddListing(db: DB): Handler {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { title, compensation, description, location, type, schedule, industry, cover_letter_required, urgent, qualifications, benefits, requirements, screening_questions } = req.body;
    const newID = randomUUID();

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

    await validate.AddListing(db, req.body);
    const listing = await jobsdb.CreateJobListing(db, newJobListing);

    res.json({
      id: listing.id,
    }).send();
  }
}

export function GetListing(db: DB): Handler {
  return async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const jobListing = await jobsdb.RetrieveJobListing(db, id);
    if (!jobListing) {
      next(ErrorJobListingNotFound);
      return;
    };


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

    try {
      await validate.UpdateListing(db, req.body);
    } catch (err) {
      next((err as Error).message);
      return;
    }
    await jobsdb.UpdateJobListing(db, updatedJobListing);

    res.sendStatus(200);
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
    res.status(200).json(jobListings);
  }
}