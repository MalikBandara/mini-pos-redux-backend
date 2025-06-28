import { NextFunction } from "express";
import { Request, Response } from "express";
import { UserModel } from "../models/user";
import bcrypt from "bcrypt";
import { ApiError } from "../errors/apiError";
import jwt from "jsonwebtoken";

export const SignUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, name, password } = req.body;
    const SALT = 10;
    const hashedPassword = await bcrypt.hash(password, SALT);
    const user = new UserModel({
      email,
      name,
      password: hashedPassword,
    });
    await user.save();
    const userWithoutPassword = {
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
    };
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new ApiError(404, "User not found");
    } else {
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        throw new ApiError(401, "Invalid Email or Password !");
      }

      const accessToken = createAccessToken(user._id.toString());

      const refreshToken = createRefreshToken(user._id.toString());

      const isProduct = process.env.NODE_ENV === "production";

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: isProduct,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: "api/auth/refresh-token",
      });

      const userWithoutPassword = {
        _id: user._id,
        name: user.name,
        email: user.email,
        accessToken
      };
      res.status(201).json(userWithoutPassword);
    }
  } catch (error: any) {
    next(error);
  }
};

const createAccessToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "15m",
  });
};

const createRefreshToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: "7d",
  });
};
