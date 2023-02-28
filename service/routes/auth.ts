import { NextFunction, Request, Response } from "express";
import bcrypt from 'bcrypt';
import 'express-async-errors';
import DB from "../../db/db";
import {createUser, retrieveUserByEmail } from "../../db/users";
import { Company, Searcher, User } from "../../models/user";
import { Error, ErrorUserExists, getErrorMessage, Handler } from "../public";
import { GenerateKeyPair, VerifyJWT } from "../tokens";
import { randomUUID } from "crypto";


// Login accepts a request containing an id and password, and return a JWT
// access key and refresh token.
export function Login(db: DB): Handler {
  return (req: Request, res: Response) => {
    const { email, password } = req.body;

    retrieveUserByEmail(db, email).then(user => {
      if (user === null) {
        return res.status(401).send("user does not exist");
      }
      const match = bcrypt.compareSync(password, user.hashedPassword);
      if (match) {
        let { access, refresh } = GenerateKeyPair(user.userID);

        return res.status(200).json({
          access: access,
          refresh: refresh,
        });
      }
      else {
        return res.status(401).send("invalid password");
      }
    }).catch(err => {
        return res.status(500).json({
            msg: err.message,
        });
    });
  }
}

export function Register(db: DB): Handler {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { userType, companyName, firstName, lastName, email, password, pfpUrl, location, notifications, savedJobs } = req.body;

    let user: User | null = await retrieveUserByEmail(db, email);

    // Sanity check for user.
    if (user !== null) {
      next(ErrorUserExists)
      return
    }

    if (!ValidPassword(password)) {
      return res.status(400).json({
        msg: "invalid password"
      })
    }

    const hash = ((): string | Error => {
      try {
        return bcrypt.hashSync(password, 10)
      } catch (e) {
        return {
          message: getErrorMessage(e),
        }
      }
    })();

    if (hash instanceof Error) {
      return res.status(500).json({
        msg: "failed to hash password",
      })
    }

    const newId = randomUUID();

    let newUser: User;

    if (userType === 'company') {
      newUser = new Company(newId, companyName, email, hash as string, pfpUrl, location, notifications, randomUUID());
      console.log(newUser)
    } else if (userType === 'searcher') {
      newUser = new Searcher(newId, firstName, lastName, email, hash as string, pfpUrl, location, savedJobs, notifications, randomUUID());
    } else {
      return res.status(400).json({
        msg: "invalid user type"
      });
    }

    await createUser(db, newUser).then(() => {
      return
    })

    let { access, refresh } = GenerateKeyPair(newUser.userID);

    return res.status(200).json({
      access: access,
      refresh: refresh,
    });
  }
}



// Refresh accepts a request containing a refresh token, and return a new JWT access key and
// refresh token.
export function Refresh(): Handler {
  return async (req: Request, res: Response) => {

    const { refresh_token } = req.body;

    const claims = VerifyJWT(refresh_token);

    if (!claims.id) {
      res.status(401).send("invalid refresh token");
      return
    }

    if (claims.type !== 'refresh') {
      res.status(401).send("invalid refresh token");
      return
    }

    if (claims.exp < Date.now()) {
      res.status(401).send("refresh token expired");
      return
    }

    let { access, refresh } = GenerateKeyPair(claims.id);

    res.status(200).json({
      access: access,
      refresh: refresh,
    });
  }
}

export function ValidPassword(password: string): boolean {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})/;
  return regex.test(password);
}

