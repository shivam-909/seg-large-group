import { Request, Response } from "express";
import DB from "../../db/db";


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
        res.send("unimplemented");
    }
}

// Logout accepts a request containing a refresh token, and invalidate the token.
export function Logout(db: DB): (req: Request, res: Response) => void {
    return (req: Request, res: Response) => {
        res.send("unimplemented");
    }
}

// Refresh accepts a request containing a refresh token, and return a new JWT access key and
// refresh token.
export function Refresh(db: DB): (req: Request, res: Response) => void {
    return (req: Request, res: Response) => {
        res.send("unimplemented");
    }
}

