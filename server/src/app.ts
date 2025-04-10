import express, { Request, Response } from "express";
import ApiError from "./utils/ApiError";
import cors from "cors";
import Queue from "bull";
import { config } from "dotenv";
import { handleCodeExecution } from "./queue/code";
config();

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());
app.get("/test", (req: Request, res: Response) => {
  res.json({ message: "Everything Right...!" });
  return;
});

export const jobQueue = new Queue("jobQueue", {
  redis: { host: "localhost", port: 6379 },
});

import codeRouters from "./routers/code";
app.use("/api/code", codeRouters);

export default app;
