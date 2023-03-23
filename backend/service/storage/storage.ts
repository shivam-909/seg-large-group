import * as AWS from 'aws-sdk';
import { Error, ErrorUserExists, getErrorMessage, Handler } from "../public";
import {Request, Response} from "express";
require('dotenv').config();

const bucket: string = `seg-joblink`;
const S3 = new AWS.S3({
    accessKeyId: 'AKIAWQAQTTQM4KT6WI7Y',
    secretAccessKey: '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',
    region: 'eu-west-2',
});
export function uploadFile() : Handler {
    return (req: Request, res: Response) => {
        const file = req.file;
        const id = req.params.id;
        const destination = req.params.destination;

        if (file == null) {
            return;
        }
        const splitFileNameByDot = file.originalname.split('.');
        const fileExtension = splitFileNameByDot[splitFileNameByDot.length - 1];
        S3.upload({
            Bucket: bucket,
            Key: `${destination}/${id}.` + fileExtension,
            Body: file.buffer,
            ContentType: file.mimetype,
        }, (err, data) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: err,
                });
            }
            return res.status(200).json({
                URL: data.Location,
            });
        });
    }
}
export function getFile() : Handler {
    return (req: Request, res: Response) => {
        const key = req.params.key;
        const destination = req.params.destination;
        S3.getObject({
            Bucket: bucket,
            Key: `${destination}/${key}`,
        }, (err, data) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: err,
                });
            }
            return res.status(200).json({
                data: data.Body,
            });
        });
    }
}
export function deleteFile() : Handler {
    return (req: Request, res: Response) => {
        const key = req.params.key;
        const destination = req.params.destination;
        S3.deleteObject({
            Bucket: bucket,
            Key: `${destination}/${key}`,
        }, (err, data) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: err,
                });
            }
            return res.status(200).json({
                message: "deleted",
            });
        });
    }
}