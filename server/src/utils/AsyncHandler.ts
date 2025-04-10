import { NextFunction, Request, RequestHandler } from "express";
import ApiError from "./ApiError";

export const AsyncHandle = (asyncRequest: RequestHandler) => {
  return async function (req: Request, res: any, next: NextFunction) {
    try {
      await Promise.resolve(asyncRequest(req, res, next));
    } catch (error: any) {
      if (error instanceof ApiError) {
        return res.status(error.statusCode).json({
          message: error.message,
          success: false,
          errors: error.errors,
        });
      }
      next(error);
    }
  };
};
