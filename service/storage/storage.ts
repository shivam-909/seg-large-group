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
        if (file == null) {
            return;
        }
        S3.upload({
                Bucket: bucket,
                Key: `${file.originalname}`,
                Body: file.buffer,
                ContentType: file.mimetype,
            }, (err, data) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        message: err,
                    });
                }
                console.log(data.Location);
            });

        // return res.status(200).json({
        //     URL: uploadedFile,
        // });
    }

// async function deleteFile(key: any) {
//     await s3
//         .deleteObject({
//             Bucket: bucket,
//             Key: key,
//         })
//         .promise();
// }
}