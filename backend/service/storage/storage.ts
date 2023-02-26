import * as AWS from 'aws-sdk';
import { S3 } from 'aws-sdk';
import { Error, ErrorUserExists, getErrorMessage, Handler } from "../public";
import {Request, Response} from "express";
require('dotenv').config();

const bucket: string = `seg-joblink`;
const s3: S3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
export function uploadFile() : Handler {
    console.log("test")
    return (req: Request, res: Response) => {
        const { file } = req.body;
        const splitFileNameByDot = file.originalname.split('.');
        const fileExtension = splitFileNameByDot[splitFileNameByDot.length - 1];
        let uploadedFile = s3
            .upload({
                Bucket: bucket,
                Key: `dev/${file.originalname}.${fileExtension}`,
                Body: file.buffer,
                ContentType: file.mimetype,
            })
        return res.status(200).json({
            URL: uploadedFile,
        });
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