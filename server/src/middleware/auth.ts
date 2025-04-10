import { getAuth } from "@clerk/express";
import { NextFunction, Request, Response } from "express";
import ApiError from "../utils/ApiError";

export const auth = (req: Request, res: any, next: NextFunction) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json(new ApiError(401, "Unauthorized"));
    }

    (req as any).userId = userId;
    next();
  } catch (error) {
    return res.status(500).json(new ApiError(500, "Unauthorized" + error));
  }
};
