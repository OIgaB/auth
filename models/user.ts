import Joi from "joi";
import { Document, model, Query, Schema, Types } from "mongoose";

import handleMongooseError from "../middlewares/handleMongooseError.js";

export interface IUser {
  name: string;
  email: string;
  password: string;
  refreshToken: string;
}
export interface IUserDocument extends IUser, Document {
  _id: Types.ObjectId;
}

const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const emailMessage =
  "Sorry, the provided email address is not valid. Please ensure it follows the correct format. Examples of valid email addresses: john.doe@example.com, jane_doe123@example.co.uk, user123@example-domain.com";

const userSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 2,
      required: [true, "Set name for user"],
    },
    email: {
      type: String,
      match: emailRegExp,
      unique: true,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      minlength: 6,
      required: [true, "Set password for user"],
    },
    refreshToken: {
      type: String,
      default: "",
    },
  },
  { versionKey: false, timestamps: true }
);

// userSchema.pre<Query<IUser, Document<IUser>>>(
//   "findOneAndUpdate",
//   validateAtUpdate as any
// );
userSchema.post<IUser>("save", handleMongooseError as any);
userSchema.post<Query<IUser, Document<IUser>>>(
  "findOneAndUpdate",
  handleMongooseError as any
);

const registerSchema = Joi.object({
  name: Joi.string().min(2).message("Ensure your name contains at least 2 letters").required(),
  email: Joi.string().pattern(emailRegExp).message(emailMessage).required(),
  password: Joi.string()
    .min(6)
    .message("Ensure your password contains at least 6 symbols")
    .required(),
});

const signInSchema = Joi.object({
  email: Joi.string().pattern(emailRegExp).message(emailMessage).required(),
  password: Joi.string()
    .min(6)
    .message("Ensure your password contains at least 6 symbols")
    .required(),
});

export const schemas = {
  registerSchema,
  signInSchema,
};

export const User = model<IUserDocument>("user", userSchema);
