import { NextFunction, Request, Response } from "express";

import { HttpError } from "../helpers/HttpError.js";

interface JoiSchema {
  validate(data: any): { error?: { message: string } };
}

const validateBody = (schema: JoiSchema) => {
  const func = (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };
  return func;
};

export default validateBody;
