import 'express-async-errors';
import { NextFunction, Request, Response } from "express";
import bcrypt from 'bcrypt';
import DB from "../../db/db";
import { CreateUser, RetrieveFullUserByEmail } from "../../db/users";
import { Company, Searcher, User } from "../../models/user";
import { Error, ErrorFailedToHashPassword, ErrorInvalidCredentials, ErrorInvalidEmail, ErrorInvalidPassword, ErrorInvalidRefreshToken, ErrorInvalidUserType, ErrorMissingCompanyName, ErrorMissingFirstName, ErrorMissingLastName, ErrorUserExists, getErrorMessage, Handler, Token } from "../public";
import { GenerateKeyPair, VerifyJWT } from "../tokens";
import { randomUUID } from "crypto";
import { CreateCompany } from "../../db/companies";
import { CreateSearcher } from "../../db/searchers";


// Login accepts a request containing an id and password, and return a JWT
// access key and refresh token.
export function Login(db: DB): Handler {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const user = await RetrieveFullUserByEmail(db, email);

    if (user === null || user === undefined) {
      next(ErrorInvalidCredentials)
      return
    }

    const valid = bcrypt.compareSync(password, user!.hashedPassword);

    if (!valid) {
      next(ErrorInvalidCredentials)
      return
    }

    const { access, refresh } = await GenerateKeyPair(user!.userID);

    return res.status(200).json({
      access,
      refresh,
    })
  }
}

export function Register(db: DB): Handler {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { user_type, company_name, first_name, last_name, email, password, pfp_url, location } = req.body;

    if (email == "test_listings_create@example.com") {
      console.log("RECEIVED TEST EMAIL")
    }

    let user: User | null = await RetrieveFullUserByEmail(db, email);

    // Sanity check for user.
    if (user !== null) {
      next(ErrorUserExists)
      return
    }

    if (user_type !== "company" && user_type !== "searcher") {
      next(ErrorInvalidUserType)
      return;
    }

    const s = ValidateRegistrationForm(
        first_name,
        last_name,
        email,
        password,
        user_type === "company",
        company_name,
    );

    if (s !== "") {
      next(s);
      return;
    }

    const hash = ((): string => {
      try {
        return bcrypt.hashSync(password, 10)
      } catch (e) {
        console.log(e);
        return "";
      }
    })();

    if (hash == "") {
      next(ErrorFailedToHashPassword);
      return;
    }

    const newUserID = randomUUID();
    const newUser = new User(newUserID, email, hash as string, pfp_url, location, []);
    const typeID = randomUUID();
    switch (user_type) {
      case "company":
        newUser.companyID = typeID;
        const newCompany = new Company(company_name, typeID);

        await CreateCompany(db, newUser, newCompany);
        break;

      case "searcher":
        newUser.searcherID = typeID;
        const newSearcher = new Searcher(first_name, last_name, [], typeID, [], [], []);

        await CreateSearcher(db, newUser, newSearcher);
        break;
    }

    const { access, refresh } = GenerateKeyPair(newUser.userID);
    return res.status(200).json({
      access,
      refresh,
      typeID,
      newUserID

    })
  }
}

// Refresh accepts a request containing a refresh token, and return a new JWT access key and
// refresh token.
export function Refresh(): Handler {
  return async (req: Request, res: Response, next: NextFunction) => {

    const { refresh_token } = req.body;

    const claims: Token = VerifyJWT(refresh_token);

    if (!claims.username) {
      console.log("does not have username")
      next(ErrorInvalidRefreshToken)
      return
    }

    if (claims.type !== 'refresh') {
      console.log("not refresh")
      next(ErrorInvalidRefreshToken)
      return
    }

    if (claims.exp * 1000 < Date.now()) {
      console.log("expired ", claims.exp, Date.now())
      next(ErrorInvalidRefreshToken)
      return
    }

    let { access, refresh } = GenerateKeyPair(claims.username);

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

  if (!isCompany) {
    if (firstName === undefined || firstName === "") {
      return ErrorMissingFirstName;
    }

    if (lastName === undefined || lastName === "") {
      return ErrorMissingLastName;
    }
  } else if (companyName === undefined || companyName === "") {
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

export function ValidEmail(email: string): boolean {

  const parts = email.split("@");
  if (parts.length !== 2) {
    return false;
  }

  return parts[1].length <= 64;


}

export function ValidPassword(password: string): boolean {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[.!@#$%^&*])(?=.{8,20})/;
  return regex.test(password);
}