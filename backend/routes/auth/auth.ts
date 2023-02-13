import { Request, Response } from "express";
import DB from "../../db/db";
import { CreateUser, RetrieveUser } from "../../db/users";
import User from "../../models/user";
import bcrypt from 'bcrypt';
import { GenerateKeyPair, ValidPassword } from "../utility";


// Login accepts a request containing a username and password, and return a JWT 
// acccess key and refresh token.
export function Login(db: DB): (req: Request, res: Response) => void {
    return (req: Request, res: Response) => {
        res.send("unimplemented");
    }
}

// Register accepts a request containing a username, password, and email, and return a JWT
// access key and refresh token.
export function Register(db: DB): (req: Request, res: Response) => void {
    return (req: Request, res: Response) => {
        const { username, password, email } = req.body;

        RetrieveUser(db, username).then((user: User | null) => {
            if (user) {
                res.status(400).send("username already taken");
                return
            }
        });

        if (!ValidPassword(password)) {
            res.status(400).send("invalid password");
            return
        }

        const hash = bcrypt.hashSync(password, 10);

        const user = new User(username, hash, email);

        CreateUser(db, user).then(() => {
            res.status(200).send("user created");
        }).catch((err) => {
            res.status(500).json(err.message);
        });

        let { access, refresh } = GenerateKeyPair(username);

        res.status(200).json({
            access: access,
            refresh: refresh,
        });
    }
}

// Refresh accepts a request containing a refresh token, and return a new JWT access key and
// refresh token.
export function Refresh(db: DB): (req: Request, res: Response) => void {
    return (req: Request, res: Response) => {
        res.send("unimplemented");
    }
}

