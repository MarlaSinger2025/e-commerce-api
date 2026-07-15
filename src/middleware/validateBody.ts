import type { ZodObject } from "zod";
import type { RequestHandler } from "express";
import { z } from 'zod';

export const valdiateBody = (zodSchema: ZodObject): RequestHandler => (req, res, next) => {
  if (!req.body) {
    next(new Error('Request body is missing', { cause: { status: 400}}));
  }
  const { data, error, success } = zodSchema.safeParse(req.body);
  if (!success) {
    next(new Error(z.prettifyError(error), { cause: { status: 400}}));
  } else {
    req.body = data;
    next();
  }
};