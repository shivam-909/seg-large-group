import { Request, Response } from "express";


// Login accepts a request containing a username and password, and return a JWT 
// acccess key and refresh token.
export function Login(req: Request, res: Response) {
    res.send("unimplemented");
}

// Register accepts a request containing a username, password, and email, and return a JWT
// access key and refresh token.
export function Register(req: Request, res: Response) {
    res.send("unimplemented");
}

// Logout accepts a request containing a refresh token, and invalidate the token.
export function Logout(req: Request, res: Response) {
    res.send("unimplemented");
}

// Refresh accepts a request containing a refresh token, and return a new JWT access key and
// refresh token.
export function Refresh(req: Request, res: Response) {
    res.send("unimplemented");
}

