import { Request, Response } from "express";
import bcrypt from 'bcrypt';

import DB from "../../db/db";
import { CreateUser, RetrieveUser } from "../../db/users";
import User from "../../models/user";
import { Error, getErrorMessage, Handler } from "../public";
import { GenerateKeyPair, VerifyJWT } from "../tokens";


// Login accepts a request containing a username and password, and return a JWT 
// acccess key and refresh token.
export function Login(db: DB): Handler {
  return (req: Request, res: Response) => {
    res.send("unimplemented");
  }
}

// Register accepts a request containing a username, password, and email, and return a JWT
// access key and refresh token.
export function Register(db: DB): Handler {
  return (req: Request, res: Response) => {
    const { username, password, email } = req.body;

    let user: User;
    RetrieveUser(db, username).then((u) => {
      user = u;
    }).catch((err) => {
      const message = getErrorMessage(err);
      if (message != "user does not exist") {
        res.status(500).json(message);
        return
      }
    });

    // Sanity check for user.
    if (user!) {
      res.status(400).send("user already exists");
      return
    }

    if (!ValidPassword(password)) {
      res.status(400).send("invalid password");
      return
    }

    const hash = bcrypt.hashSync(password, 10);
    const newUser = new User(username, hash, email);
    CreateUser(db, newUser).then(() => {
      res.status(200).send("user created");
      return
    }).catch((err) => {
      res.status(500).json(err.message);
      return
    });

    let { access, refresh } = GenerateKeyPair(username);

    res.status(200).json({
      access: access,
      refresh: refresh,
    });
    return
  }
}

// Refresh accepts a request containing a refresh token, and return a new JWT access key and
// refresh token.
export function Refresh(db: DB): Handler {
  return (req: Request, res: Response) => {

    const { refresh_token } = req.body;

    const claims = VerifyJWT(refresh_token);

    if (!claims.username) {
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

    let { access, refresh } = GenerateKeyPair(claims.username);

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
