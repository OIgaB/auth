import bcrypt from "bcrypt";
import { Request, Response } from "express";
import fs from "fs/promises";
import gravatar from "gravatar";
import { Jimp } from "jimp";
import jwt, { JwtPayload } from "jsonwebtoken";
import path from "path";

import { ctrlWrapper } from "../decorators/index.js";
import { HttpError } from "../helpers/HttpError.js";
import { User } from "../models/user.js";

interface RegisterRequestBody {
  name: string;
  email: string;
  password: string;
  avatarURL: string;
}

const { SECRET_KEY, REFRESH_SECRET_KEY } = process.env;

const register = async (
  req: Request<{}, {}, RegisterRequestBody>,
  res: Response
) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email already in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  let avatarURL = gravatar.url(email, {
    s: "250",
    d: "identicon",
    protocol: "https",
  });

  if (req.file) {
    const { path: oldPath, filename } = req.file;

    const avatarDir = path.resolve("public", "avatars"); 
    const newPath = path.join(avatarDir, filename);
    
    const image = await Jimp.read(oldPath);
    image.resize({ w: 250, h: 250 });
    await image.write(newPath as `${string}.${string}`);

    await fs.rename(oldPath, newPath); 

    avatarURL = path.join("avatars", filename);
  }

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
  });

  res.status(201).json({
    user: {
      name: newUser.name,
      email: newUser.email,
      avatarURL: newUser.avatarURL,
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
  const payload = { id: user._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "15m" }); // access token

  if (!REFRESH_SECRET_KEY) {
    throw HttpError(401, "REFRESH_SECRET_KEY environment variable is missing.");
  }

  const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {
    expiresIn: "7d",
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
  });

  await User.findByIdAndUpdate(
    user._id,
    { refreshToken },
    { runValidators: true }
  );

  res.json({
    token,
    user: {
      email: email,
    },
  });
};

const signOut = async (req: Request, res: Response) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { refreshToken: "" });

  res.status(204).send();
};

const getCurrent = async (req: Request, res: Response) => {
  const { email } = req.user;

  res.json({ email });
};

const removeCurrent = async (req: Request, res: Response) => {
  const { _id } = req.user;
  await User.findByIdAndDelete(_id);

  res.status(204).send();
};

const refresh = async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    throw HttpError(401, "Missing refresh token");
  }

  if (!REFRESH_SECRET_KEY) {
    throw HttpError(401, "REFRESH_SECRET_KEY environment variable is missing.");
  }

  const { id } = jwt.verify(refreshToken, REFRESH_SECRET_KEY) as JwtPayload;

  const user = await User.findById(id);

  if (!user || user.refreshToken !== refreshToken) {
    throw HttpError(401, "Invalid refresh token");
  }

  if (!SECRET_KEY) {
    throw HttpError(401, "SECRET_KEY environment variable is missing.");
  }

  const newAccessToken = jwt.sign({ id: user._id }, SECRET_KEY, {
    expiresIn: "15m",
  });

  res.json({ token: newAccessToken });
};

export default {
  register: ctrlWrapper(register),
  signIn: ctrlWrapper(signIn),
  signOut: ctrlWrapper(signOut),
  getCurrent: ctrlWrapper(getCurrent),
  removeCurrent: ctrlWrapper(removeCurrent),
  refresh: ctrlWrapper(refresh),
};
