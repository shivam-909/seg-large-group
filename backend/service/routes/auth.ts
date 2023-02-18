import { Request, Response } from "express";
import bcrypt from 'bcrypt';

import DB from "../../db/db";
import { CreateUser, RetrieveUser } from "../../db/users";
import User from "../../models/user";
import { Error, getErrorMessage, Handler } from "../public";
import { GenerateKeyPair, VerifyJWT } from "../tokens";


// Login accepts a request containing a username and password, and return a JWT 
// access key and refresh token.
export function Login(db: DB): Handler {
  return (req: Request, res: Response) => {
    const { email, password } = req.body;

    let user: User;
    RetrieveUser(db, email).then((u) => {
      user = u;
    }).catch((err) => {
      const message = getErrorMessage(err);
      if (message != "user does not exist") {
        res.status(500).json(message);
        return
      }
    });

    if (user!) {
      const hashedPassword = bcrypt.hashSync(password, 10);
      if (user.hashedPassword == hashedPassword) {
        let { access, refresh } = GenerateKeyPair(user.username);

        res.status(200).json({
          access: access,
          refresh: refresh,
        });
        return
      }
      else {
        res.status(401).send("invalid password");
        return
      }
    }
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
        return res.status(500).json(
          {
            msg: message,
          }
        );
      }
    });

    // Sanity check for user.
    if (user!) {
      return res.status(400).send("user already exists");
    }

    if (!ValidPassword(password)) {
      return res.status(400).send("invalid password");
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
        msg: "failed to hash password" + getErrorMessage(hash)
      })
    }

    const newUser = new User(username, hash as string, email);
    CreateUser(db, newUser).then(() => {
      return
    }).catch((err) => {
      return res.status(500).json(err.message);
    });

    let { access, refresh } = GenerateKeyPair(username);

    return res.status(200).json({
      access: access,
      refresh: refresh,
    });
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
