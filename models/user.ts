import Joi from "joi";
import { Document, Query, Schema, model } from "mongoose";

import handleMongooseError from "../middlewares/handleMongooseError.js";

export interface IUser {
  email: string;
  password: string;
  token: string;
}

const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const emailMessage =
  "Sorry, the provided email address is not valid. Please ensure it follows the correct format. Examples of valid email addresses: john.doe@example.com, jane_doe123@example.co.uk, user123@example-domain.com";

const userSchema = new Schema(
  {
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
    token: {
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

export const User = model("user", userSchema);
