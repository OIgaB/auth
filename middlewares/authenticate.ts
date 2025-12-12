import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import { ctrlWrapper } from "../decorators/index.js";
import { HttpError } from "../helpers/HttpError.js";
import { User } from "../models/user.js";

const { SECRET_KEY } = process.env;

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization = "" } = req.headers;

  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(HttpError(401, "Missing token"));
  }

  try {
    if (!SECRET_KEY) {
      throw HttpError(401, "SECRET_KEY environment variable is missing.");
    }
    const { id } = jwt.verify(token, SECRET_KEY) as JwtPayload;

    const user = await User.findById(id);

    if (!user || !user.token || user.token !== token) {
      next(HttpError(401, "Invalid or missing token"));
    }
    req.user = user;

    next();
  } catch (error: unknown) {
    if (error instanceof jwt.TokenExpiredError) {
      return next(HttpError(401, "Token expired"));
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return next(HttpError(401, "Invalid or missing token"));
    }
    return next(HttpError(401, "Unauthorized"));
  }
};

export default ctrlWrapper(authenticate);
