import 'express-async-errors';
import { NextFunction, Request, Response } from 'express';
import { ErrorToCode, Token } from './public';
import { VerifyJWT } from './tokens';

export const ErrorMW = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    const em = typeof err === "string" ? err : err.message;
    const code = ErrorToCode.get(em) || 500;
    res.status(code).json({ message: em || 'internal server error' });
};

export const AuthMW = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) return res.status(401).json({ message: 'unauthorized' });

    const split = token.split(' ');

    if (split.length !== 2) return res.status(401).json({ message: 'unauthorized' });

    const token_value = split[1];

    const verify = (): Token | null => {
        try {
            return VerifyJWT(token_value);
        } catch (e) {
            console.log(e);
            return null;
        }
    };

    const payload = verify();

    if (!payload) return res.status(403).json({ message: 'unauthorized' });

    req.headers["auth_username"] = payload.username;
    req.headers["auth_type"] = payload.type;

    next();
}
