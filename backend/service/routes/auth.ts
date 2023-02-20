import { NextFunction, Request, Response } from "express";
import bcrypt from 'bcrypt';
import 'express-async-errors';
import DB from "../../db/db";
import { CreateUser, RetrieveUser, RetrieveUserByEmail } from "../../db/users";
import User from "../../models/user";
import { Error, ErrorUserExists, getErrorMessage, Handler } from "../public";
import { GenerateKeyPair, VerifyJWT } from "../tokens";
import { randomUUID } from "crypto";


// Login accepts a request containing a id and password, and return a JWT 
// acccess key and refresh token.
export function Login(db: DB): Handler {
  return async (req: Request, res: Response) => {
    res.send("unimplemented");
  }
}

// Register accepts a request containing an email and password, and return a JWT
// access key and refresh token.
export function Register(db: DB): Handler {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { password, email } = req.body;

    let user: User | null = await RetrieveUserByEmail(db, email)

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

    const newID = randomUUID();

    const newUser = new User(newID, hash as string, email);

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
export function Refresh(db: DB): Handler {
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