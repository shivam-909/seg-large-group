import { NextFunction, Request, Response } from "express";
import DB from "../../db/db";
import JobListing from "../../models/job";
import { createJobListing, retrieveJobListing} from "../../db/jobs";
import { Error, getErrorMessage, Handler } from "../public";
import {seedJobListings} from "../../seeder/seed";
import { randomUUID } from "crypto";

export function AddListing(db: DB): Handler {
    return async (req: Request, res: Response, next: NextFunction) => {
        const { title, compensation, description, location, schedule, companyName, type, datePosted, benefits, requirements } = req.body;
        const newID = randomUUID();
        const newJobListing = new JobListing(newID, title, compensation, description, location, schedule, companyName, type, datePosted, benefits, requirements);

        try {
            await createJobListing(db, newJobListing);
            res.status(200).json({
                msg: "job listing created"
            });
        } catch (err) {
            next({
                message: getErrorMessage(err),
            });
        }
    }
}

export function GetListing(db: DB): Handler {
    return async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;

        try {
            const jobListing = await retrieveJobListing(db, id);
            if (jobListing) {
                res.status(200).json(jobListing);
            } else {
                res.status(404).json({
                    message: 'Job listing not found'
                });
            }
        } catch (err) {
            next({
                message: getErrorMessage(err),
            });
        }
    };
}




export function SeedJobs(db: DB): Handler {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await seedJobListings(db);
            res.status(200).json({
                message: 'Job listings seeded successfully'
            });
        } catch (err) {
            next(err);
        }
    };
}