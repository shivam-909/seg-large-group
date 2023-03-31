import express, { Express, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import DB from './db/db';
import { uploadFile, getFile, deleteFile } from './service/storage/storage';
import multer from 'multer';

import * as utils from './service/routes/routes';
import * as listingroutes from './service/routes/jobs';
import * as userroutes from "./service/routes/users";
import * as authroutes from "./service/routes/auth";
import * as applicationroutes from "./service/routes/applications";
import * as middleware from './service/middleware';
import * as notificationroutes from "./service/routes/notifications";
import * as companiesroutes from "./service/routes/companies";
import * as searcherroutes from "./service/routes/searchers";
import * as util from './service/routes/routes';
import * as searchroutes from "./service/routes/search";
import * as matchmakeroutes from "./service/routes/matchmaking";

import cors from 'cors';
import { FullSeed } from './seed';

export const db = new DB();

export const run = () => {
  dotenv.config();

  let run = true;
  process.argv.forEach((val, index) => {
    if (val === '--seed') {
      FullSeed(db);
      run = false;
      return;
    }
  });

  if (run) {

    const app: Express = express();
    const port = process.env.PORT || 8000;

    // Routes with upload.none() provided will accept a form.
    const upload = multer();

    app.set('db', db);
    app.use(cors());

    // Authentication middleware
    app.use("/api/*", middleware.AuthMW);

    app.get('/error', util.ErrorTest)

    app.post('/auth/login', upload.none(), utils.Route(app, authroutes.Login));
    app.post('/auth/register', upload.none(), utils.Route(app, authroutes.Register));
    app.post('/auth/refresh', upload.none(), utils.Route(app, authroutes.Refresh));

    app.post('/api/notifications/add', upload.none(), utils.Route(app, notificationroutes.AddNotification));
    app.get('/api/notifications/:id', utils.Route(app, notificationroutes.GetAllUserNotifs));
    app.delete('/api/notifications/:id', upload.none(), utils.Route(app, notificationroutes.DeleteNotification));

    app.get('/api/match/:id', upload.none(), utils.Route(app, matchmakeroutes.getJobListingsForSearcherRoute));

    app.get('/api/user/:id', upload.none(), utils.Route(app, userroutes.GetUser));

    app.post('/api/jobs/search', upload.none(), utils.Route(app, searchroutes.SearchListings));
    app.post('/api/jobs/filter', upload.none(), utils.Route(app, listingroutes.RetrieveJobListingsByFilter));
    app.post('/api/jobs/', upload.none(), utils.Route(app, listingroutes.AddListing));
    app.get('/api/jobs/:id', utils.Route(app, listingroutes.GetListing));
    app.patch('/api/jobs/:id', upload.none(), utils.Route(app, listingroutes.UpdateListing));
    app.delete('/api/jobs/:id', upload.none(), utils.Route(app, listingroutes.DeleteListing));

    app.post('/api/applications/add', upload.none(), utils.Route(app, applicationroutes.AddApplication));
    app.get('/api/applications/:id', utils.Route(app, applicationroutes.GetApplication));
    app.post('/api/applications/filter', upload.none(), utils.Route(app, applicationroutes.RetrieveApplicationByFilter));
    app.patch('/api/applications/:id', upload.none(), utils.Route(app, applicationroutes.UpdateApplication));
    app.delete('/api/applications/:id', upload.none(), utils.Route(app, applicationroutes.DeleteApplication));
    app.post('/api/application/filter', upload.none(), utils.Route(app, applicationroutes.RetrieveApplicationByFilter));

    app.get('/api/storage/:destination/:key', upload.none(), utils.Route(app, getFile));
    app.post('/api/storage/:destination/:id', upload.single('file'), utils.Route(app, uploadFile));
    app.delete('/api/storage/:destination/:key', upload.none(), utils.Route(app, deleteFile));

    app.post('/api/user/typeid', upload.none(), utils.Route(app, userroutes.GetUserByTypeID));
    app.get('/api/user/:id', upload.none(), utils.Route(app, userroutes.GetUser));
    app.patch('/api/users/:id', upload.none(), utils.Route(app, userroutes.UpdateUser));
    app.delete('/api/user/:id', upload.none(), utils.Route(app, userroutes.DeleteUser));

    app.get('/api/company/:id', utils.Route(app, companiesroutes.GetCompany));
    app.get('/api/searcher/:id', utils.Route(app, searcherroutes.GetSearcher));


    app.get('/', util.HealthCheck);


    // Error handling middleware
    app.use(middleware.ErrorMW);

    app.post("/api/echo", util.Echo);

    app.listen(port, () => {
      console.log(`server running on port ${port}`);
    });
  }
}

run();
