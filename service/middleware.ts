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

// Create a map of routes to a boolean
// If the route is in the map, don't error if the user is not logged in

const allowUnauthenticated = [
    "/api/jobs/search",
    "/api/jobs/filter",
    "/api/jobs/*",
    "/api/company/*",
    "/api/application/filter",
    "/api/user/typeid",
    "/api/user",
    "/api/users",
    "/api/users/*",
    "/api/notifications",
    "/api/notifications/add",
    "/api/applications/*",
    "/api/searcher/*",
    "/api/storage/*"
];


function doesntRequireAuth(url: string): boolean {

    for (const route of allowUnauthenticated) {
        if (route === url) {
            return true;
        }
        else if (route.endsWith("*")) {
            const routeWithoutWildcard = route.slice(0, -1);
            if (url.startsWith(routeWithoutWildcard)) {
                return true;
            }
        }
    }

    return false;
}

export const AuthMW = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    const dontRequireAuth = doesntRequireAuth(req.originalUrl);
    if (!token && !dontRequireAuth) {
        return res.status(401).json({ message: 'unauthorized' });
    }
    else if (!token) {
        return next()
    }

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