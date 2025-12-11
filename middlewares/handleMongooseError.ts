import { NextFunction } from "express";
import { Error } from "mongoose";

interface MongoServerError extends Error {
  code?: number;
  status?: number;
}

const handleMongooseError = (
  error: MongoServerError,
  data: any,
  next: NextFunction
): void => {
  const { name, code } = error;
  const status = name === "MongoServerError" && code === 11000 ? 409 : 400;
  error.status = status;
  next();
};

export default handleMongooseError;
