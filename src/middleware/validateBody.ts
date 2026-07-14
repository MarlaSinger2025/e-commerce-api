import { ZodType } from "zod";
import type { Request, Response, NextFunction } from "express";

export const valdiateBody = (schema: ZodType) => {
    return (req:Request, res:Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({ message: 'Invalid input', errors: result.error.issues});
        }
        req.body = result.data;
        next();
    };
}