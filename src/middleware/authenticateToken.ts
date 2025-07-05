import { Request, Response, NextFunction } from "express";
import { ApiError } from "../errors/apiError";
import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      throw new ApiError(403, "Access token not found !");
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, (error, decoded) => {
      if (error) {
        if (error instanceof TokenExpiredError) {
          throw new ApiError(403, "Token is Expired!");
        } else if (error instanceof JsonWebTokenError) {
          throw new ApiError(403, "Invalid Access token!");
        } else {
          throw new ApiError(500, "Error verifying access token!");
        }
      }
      if (!decoded || typeof decoded === "string") {
        throw new ApiError(500, "Access token payload Error!");
      }

      next();
    });
  } catch (error) {
    next(error);
  }
};
