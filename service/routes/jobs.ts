import { NextFunction, Request, Response } from "express";
import DB from "../../db/db";
import JobListing from "../../models/job";
import {createJobListing, retrieveJobListing, deleteJobListing} from "../../db/jobs";
import { Error, getErrorMessage, Handler } from "../public";
import { randomUUID } from "crypto";

export function addListingRoute(db: DB): Handler {
    return async (req: Request, res: Response, next: NextFunction) => {
        const { title, compensation, description, location, schedule, companyName, type, datePosted, benefits, requirements } = req.body;
        const newID = randomUUID();
        const newJobListing = new JobListing(newID, title, compensation, description, location, schedule, companyName, type, datePosted, benefits, requirements);

        try {
            let listing = await createJobListing(db, newJobListing);
            res.status(200).json({
                msg: `Job listing ${listing.id} created`,
            });
        } catch (err) {
            next({
                message: getErrorMessage(err),
            });
        }
    }
}

export function getListingRoute(db: DB): Handler {
    return async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;

        try {
            const jobListing = await retrieveJobListing(db, id);
            if (jobListing) {
                res.status(200).json(jobListing);
            } else {
                res.status(404).json({
                    message: `Job listing {id} not found`,
                });
            }
        } catch (err) {
            next({
                message: getErrorMessage(err),
            });
        }
    };
}

export function deleteListingRoute(db: DB): Handler {
    return async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;

        try {
            await deleteJobListing(db, id);
            res.status(200).json({
                msg: `Job listing ${id} has been deleted`,
            });
        } catch (err) {
            next({
                message: getErrorMessage(err),
            });
        }
    };
}
