import { Request, Response } from 'express';

export function HealthCheck(req: Request, res: Response) {
    res.send('Binary Bandits API');
}

