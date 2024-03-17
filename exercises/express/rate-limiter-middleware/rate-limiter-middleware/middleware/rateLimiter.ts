import { Request, Response, NextFunction } from 'express';

let requestLog : Record<string, number> = {};

export const rateLimiter = (req: Request, res: Response, next: NextFunction) => {
    console.log(`${req.ip} ${req.method} ${req.path}`);
    if (req.ip) {
        let previous: number = requestLog[req.ip] ?? 0;
        requestLog[req.ip] = new Date().getTime();

        if (requestLog[req.ip] - previous < 1000) {
            res.status(429).send("Too many requests");
            return;
        }

    }

    next();
};