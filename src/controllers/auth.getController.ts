import { NextFunction } from "express";
import { Request, Response } from "express";
import { UserModel } from "../models/user";

export const getUsers = async (
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  try {


    // get users without password 
    const user = await UserModel.find().select("-password");

    resp.status(200).json(user);
  } catch (error: any) {
    next(error);
  }
};
