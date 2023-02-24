import { NextFunction, Request, Response } from "express";
import bcrypt from 'bcrypt';
import 'express-async-errors';
import DB from "../../db/db";
import { CreateUser, RetrieveUserByEmail } from "../../db/users";
import User from "../../models/user";
import { Error, ErrorFailedToHashPassword, ErrorInvalidEmail, ErrorInvalidPassword, ErrorMissingCompanyName, ErrorMissingFirstName, ErrorMissingLastName, ErrorUserExists, getErrorMessage, Handler } from "../public";
import { GenerateKeyPair, VerifyJWT } from "../tokens";
import { randomUUID } from "crypto";


// Login accepts a request containing an id and password, and return a JWT
// access key and refresh token.
export function Login(db: DB): Handler {
  return async (req: Request, res: Response) => {
    const { email, password } = req.body;

    let user: User | null = await RetrieveUserByEmail(db, email)

    if (user === null) {
      res.status(403).send("invalid credentials");
      return
    }

    const match = bcrypt.compareSync(password, user.hashedPassword);

    if (!match) {
      res.status(403).send("invalid credentials");
      return
    }

    let { access, refresh } = GenerateKeyPair(user.idField);

    res.status(200).json({
      access: access,
      refresh: refresh,
    });
  }
}

// Expects multi-part form.
// Register accepts a request containing an email and password, and return a JWT
// access key and refresh token.
export function Register(db: DB): Handler {
  return async (req: Request, res: Response, next: NextFunction) => {
    var {
      first_name,
      last_name,
      email,
      password,
      is_company,
      company_name,
      pfp_url,
      location
    } = req.body;

    const isCompany = is_company === "true";

    const valid = ValidateRegistrationForm(
      first_name,
      last_name,
      email,
      password,
      isCompany,
      company_name,
    );

    if (valid != "") {
      next(valid);
    }

    if (company_name === undefined) {
      company_name = "";
    }

    if (pfp_url === undefined) {
      pfp_url = "";
    }

    if (location === undefined) {
      location = "";
    }

    let user: User | null = await RetrieveUserByEmail(db, email);

    // Sanity check for user.
    if (user !== null) {
      next(ErrorUserExists)
      return
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
      next(ErrorFailedToHashPassword)
      return
    }

    const newId = randomUUID();
    const newUser = new User(
      newId,
      first_name,
      last_name,
      email,
      hash as string,
      isCompany,
      company_name,
      pfp_url,
      location,
      [], [])

    await CreateUser(db, newUser).then(() => {
      return
    })

    let { access, refresh } = GenerateKeyPair(newUser.idField);

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

  console.log(email);

  const parts = email.split("@");
  if (parts.length !== 2) {
    return false;
  }

  if (parts[1].length > 64) {
    return false;
  }

  return true;
}

export function ValidPassword(password: string): boolean {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})/;
  return regex.test(password);
}
