import { Request, Response } from "express";
import bcrypt from "bcrypt";

import { ctrlWrapper } from "../decorators/index.js";
import { HttpError } from "../helpers/HttpError.js";
import { User } from "../models/user.js";

interface RegisterRequestBody {
  email: string;
  password: string;
}

const register = async (
  req: Request<{}, {}, RegisterRequestBody>,
  res: Response
) => {
  console.info("req.body: ", req.body);
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email already in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({
    user: {
      email: newUser.email,
    },
  });
};

export default {
  register: ctrlWrapper(register),
};
