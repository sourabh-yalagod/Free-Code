import { Request, Response } from "express";
import { AsyncHandle } from "../utils/AsyncHandler";
import ApiResponse from "../utils/ApiRespose";
import ApiError from "../utils/ApiError";
import { Code } from "../models/code";
import { handleCodeExecution } from "../queue/code";
import { jobQueue } from "../app";

const codeExecution = AsyncHandle(
  async (req: Request, res: Response): Promise<any> => {
    const { language, code } = req.body;

    if (!language || !code) {
      res
        .status(401)
        .json(new ApiError(401, "Language and Code Required . . .!"));
      return;
    }
    try {
      const job = await Code.create({
        language,
        code,
      });

      await jobQueue.add({ code, language });
      handleCodeExecution(res, job.id);
    } catch (error) {
      console.log("error : ", error);

      res.status(500).json(new ApiError(500, "Code Execution Error.....!"));
      return;
    }
  }
);

export { codeExecution };
