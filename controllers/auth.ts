import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { ctrlWrapper } from "../decorators/index.js";
import { HttpError } from "../helpers/HttpError.js";
import { User } from "../models/user.js";

interface RegisterRequestBody {
  email: string;
  password: string;
}

const { SECRET_KEY } = process.env;

const register = async (
  req: Request<{}, {}, RegisterRequestBody>,
  res: Response
) => {
  // console.info("req.body: ", req.body);
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

const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "There is no user with such an email");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Invalid password");
  }
  if (!SECRET_KEY) {
    throw HttpError(401, "SECRET_KEY environment variable is missing.");
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token }, { runValidators: true});

  res.json({
    token,
    user: {
      email: email,
    },
  });
};

export default {
  register: ctrlWrapper(register),
  signIn: ctrlWrapper(signIn),
};
