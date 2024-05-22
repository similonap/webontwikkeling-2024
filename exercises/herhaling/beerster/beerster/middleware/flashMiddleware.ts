import { Request, Response, NextFunction } from "express";

export function flashMiddleware(req: Request, res: Response, next: NextFunction) {
    res.locals.errorMessage = req.session.message;
    req.session.message = undefined;
    next();
}