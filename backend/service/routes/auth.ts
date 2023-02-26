import { NextFunction, Request, Response } from "express";
import bcrypt from 'bcrypt';
import 'express-async-errors';
import DB from "../../db/db";
import { CreateUser, RetrieveUserByEmail } from "../../db/users";
import User from "../../models/user";
import { Error, ErrorFailedToHashPassword, ErrorInvalidEmail, ErrorInvalidPassword, ErrorMissingCompanyName, ErrorMissingFirstName, ErrorMissingLastName, ErrorUserExists, getErrorMessage, Handler } from "../public";
import { GenerateKeyPair, VerifyJWT } from "../tokens";
import { randomUUID } from "crypto";
import SendEmail from "./emails";


// Login accepts a request containing an id and password, and return a JWT
// access key and refresh token.
export function Login(db: DB): Handler {
  return async (req: Request, res: Response) => {
    const { email, password } = req.body;

    let user: User | null = await RetrieveUserByEmail(db, email);

    if (user === null) {
      return res.status(403).send("invalid credentials");
    }

    const match = bcrypt.compareSync(password, user.hashedPassword);

    if (!match) {
      return res.status(403).send("invalid credentials");
    }

    let { access, refresh } = GenerateKeyPair(user.idField);

    res.status(200).json({
      access: access,
      refresh: refresh,
    });
  }
}

// Expects multipart form.
// Register accepts a request containing an email and password, and return a JWT
// access key and refresh token.
export function Register(db: DB): Handler {
  return async (req: Request, res: Response, next: NextFunction) => {
    let {
      firstName,
      lastName,
      email,
      password,
      isCompany,
      companyName,
      pfpUrl,
      location
    } = req.body;

    const valid = ValidateRegistrationForm(
        firstName,
        lastName,
        email,
        password,
        isCompany === "true",
        companyName,
    );

    if (valid != "") {
      next(valid);
    }

    if (isCompany === undefined) {
      companyName = "";
    }

    if (pfpUrl === undefined) {
      pfpUrl = "";
    }

    if (location === undefined) {
      location = "";
    }

    let user: User | null = await RetrieveUserByEmail(db, email);

    // Sanity check for user.
    if (user !== null) {
      return next(ErrorUserExists)
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
      return next(ErrorFailedToHashPassword)
    }

    const newId = randomUUID();
    const newUser = new User(
      newId,
      firstName,
      lastName,
      email,
      hash as string,
      isCompany,
      companyName,
      pfpUrl,
      location,
      [], [])

    await CreateUser(db, newUser).then(() => {
      return
    })

    let { access, refresh } = GenerateKeyPair(newUser.idField);

    res.status(200).json({
      access: access,
      refresh: refresh,
    });

    return await SendEmail("donotreply.joblink@gmail.com", email, "Verify your email address", `<h1>Hi ${firstName}!</h1><br><h2>Click <a href="http://localhost:3000/verify/${newId}">here</a> to verify your email address.</h2>`);
  }
}

// Refresh accepts a request containing a refresh token, and return a new JWT access key and
// refresh token.
export function Refresh(): Handler {
  return async (req: Request, res: Response) => {

    const { refresh_token } = req.body;

    const claims = VerifyJWT(refresh_token);

    if (!claims.id) {
      return res.status(401).send("invalid refresh token");
    }

    if (claims.type !== 'refresh') {
      return res.status(401).send("invalid refresh token");
    }

    if (claims.exp < Date.now()) {
      return res.status(401).send("refresh token expired");
    }

    let { access, refresh } = GenerateKeyPair(claims.id);

    res.status(200).json({
      access: access,
      refresh: refresh,
    });
  }
}

function ValidateRegistrationForm(
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  isCompany: boolean,
  companyName: string,
): string {

  if (email === undefined || email === "") {
    return ErrorInvalidEmail;
  }

  if (password === undefined || password === "") {
    return ErrorInvalidPassword;
  }

  if (firstName === undefined || firstName === "") {
    return ErrorMissingFirstName;
  }

  if (lastName === undefined || lastName === "") {
    return ErrorMissingLastName;
  }

  if (isCompany && companyName === undefined || companyName === "") {
    return ErrorMissingCompanyName;
  }

  if (!ValidEmail(email)) {
    return ErrorInvalidEmail;
  }

  if (!ValidPassword(password)) {
    return ErrorInvalidPassword;
  }

  return "";
}

function ValidEmail(email: string): boolean {
  const parts = email.split("@");
  if (parts.length !== 2) {
    return false;
  }

  return parts[1].length <= 64;


}

export function ValidPassword(password: string): boolean {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})/;
  return regex.test(password);
}
