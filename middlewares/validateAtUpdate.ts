import { NextFunction } from "express";
import { Query } from "mongoose";

interface MongooseQuery extends Query<any, any> {
  options: {
    runValidators?: boolean;
  };
}

const validateAtUpdate = function (
  this: MongooseQuery,
  next: NextFunction
): void {
  this.options.runValidators = true;
  next();
};

export default validateAtUpdate;
