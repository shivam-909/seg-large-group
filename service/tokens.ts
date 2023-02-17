import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/config';

export function GenerateKeyPair(username: string) {
    const access = GenerateJWT('access', username);
    const refresh = GenerateJWT('refresh', username);

    return {
        access: access,
        refresh: refresh,
    };
}

function GenerateJWT(type: string, username: string): string {
    const payload = {
        type: type,
        username: username,
    };

    const options = {
        expiresIn: '1d',
    };

    if (type === 'access') {
        options.expiresIn = '15m';
    }

    return jwt.sign(payload, JWT_SECRET, options);
}


export function VerifyJWT(token: string): { username: string, type: string, exp: number } {
    const payload = jwt.verify(token, JWT_SECRET) as any;

    return {
        username: payload.username,
        type: payload.type,
        exp: payload.exp,
    }
}