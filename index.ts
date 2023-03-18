import express, { Express, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import DB from './db/db';
import multer from 'multer';
import { deseed } from "./seeder/deseeder";

import * as utils from './service/routes/routes';
import * as listingroutes from './service/routes/jobs';
import * as seedroutes from "./service/routes/seeder";
import * as userroutes from "./service/routes/users";
import * as authroutes from "./service/routes/auth";
import * as applicationroutes from "./service/routes/applications";
import * as middleware from './service/middleware';
import * as notificationroutes from "./service/routes/notifications";
import * as companiesroutes from "./service/routes/companies";
import * as searcherroutes from "./service/routes/searchers";
import * as util from './service/routes/routes';
import cors from 'cors';

export const db = new DB();

export const run = () => {
  dotenv.config();

  const app: Express = express();
  const port = process.env.PORT || 8000;

  // Routes with upload.none() provided will accept a form.
  const upload = multer();

  app.set('db', db);
  app.use(cors());

  app.post('/auth/login', upload.none(), utils.Route(app, authroutes.Login));
  app.post('/auth/register', upload.none(), utils.Route(app, authroutes.Register));
  app.post('/auth/refresh', upload.none(), utils.Route(app, authroutes.Refresh));


  app.post('/api/notifications/add', upload.none(), utils.Route(app, notificationroutes.AddNotification));
  app.get('/api/notifications/:id', utils.Route(app, notificationroutes.GetNotification));
  app.patch('/api/notifications/:id', upload.none(), utils.Route(app, notificationroutes.UpdateNotification));
  app.delete('/api/notifications/:id', upload.none(), utils.Route(app, notificationroutes.DeleteNotification));

  app.post('/api/jobs/filter', upload.none(), utils.Route(app, listingroutes.RetrieveJobListingsByFilter));
  app.post('/api/jobs/add', upload.none(), utils.Route(app, listingroutes.AddListing));
  app.get('/api/jobs/:id', utils.Route(app, listingroutes.GetListing));
  app.patch('/api/jobs/:id', upload.none(), utils.Route(app, listingroutes.UpdateListing));
  app.delete('/api/jobs/:id', upload.none(), utils.Route(app, listingroutes.DeleteListing));


  app.post('/api/applications/add', upload.none(), utils.Route(app, applicationroutes.AddApplication));
  app.get('/api/applications/:id', utils.Route(app, applicationroutes.GetApplication));
  app.patch('/api/applications/:id', upload.none(), utils.Route(app, applicationroutes.UpdateApplication));
  app.delete('/api/applications/:id', upload.none(), utils.Route(app, applicationroutes.DeleteApplication));
  app.post('/api/application/filter', upload.none(), utils.Route(app, applicationroutes.RetrieveApplicationByFilter));



  app.get('/api/user/typeid', upload.none(), utils.Route(app, userroutes.GetUserByTypeID));
  app.get('/api/user/:id', upload.none(), utils.Route(app, userroutes.GetUser));
  app.patch('/api/users/:id', upload.none(), utils.Route(app, userroutes.UpdateUser));
  app.delete('/api/user/:id', upload.none(), utils.Route(app, userroutes.DeleteUser));

  app.get('/api/company/:id', utils.Route(app, companiesroutes.GetCompany));
  app.get('/api/searcher/:id', utils.Route(app, searcherroutes.GetSearcher));

  app.post('/api/seed_all', utils.Route(app, seedroutes.SeedAll));
  app.delete('/api/deseed', utils.Route(app, deseed));

  app.get('/', util.HealthCheck);


  // Error handling middleware
  app.use(middleware.ErrorMW);

  // Authentication middleware
  app.use("/api/*", middleware.AuthMW);

  app.post("/api/echo", util.Echo);

  app.listen(port, () => {
    console.log(`server running on port ${port}`);
  });
}

run();
