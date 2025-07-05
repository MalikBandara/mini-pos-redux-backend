import { NextFunction } from "express";
import mongoose from "mongoose";
import { Request, Response } from "express";
import { ApiError } from "../errors/apiError";

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // ✅ Prevent double-send
  if (res.headersSent) {
    return next(error);
  }

  if (error instanceof mongoose.Error) {
    res.status(400).json({ message: error.message });
    return;
  }

  if (error instanceof ApiError) {
    res.status(error.status).json({ message: error.message });
    return;
  }

  // Catch-all fallback
  res.status(500).json({ message: "Internal server error" });
};
